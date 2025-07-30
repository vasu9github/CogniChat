import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import { genAI } from '../lib/gemini.js';


export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).sort({ updatedAt: -1 }).select('title');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('messages');
    if (!chat || chat.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const generateChatResponse = async (req, res) => {
  const { prompt, chatId } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const userMessagePromise = Message.create({ role: "user", content: prompt });
    
    let conversationHistory = [];
    if (chatId) {
      const existingChat = await Chat.findById(chatId).populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 5 }
      });
      if (existingChat && existingChat.userId.toString() === userId.toString()) {
        conversationHistory = existingChat.messages.reverse().map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }));
      }
    }

  
    const conversation = [
      ...conversationHistory,
      { role: "user", parts: [{ text: prompt }] }
    ];

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        candidateCount: 1,
      },
    });

    const result = await model.generateContent({ contents: conversation }); 
    const response = await result.response;
    const aiText = response.text();
    
    const userMessage = await userMessagePromise;
    const aiMessage = await Message.create({ role: "model", content: aiText });

    let currentChat;
    if (chatId) {
      currentChat = await Chat.findById(chatId);
      if (!currentChat || currentChat.userId.toString() !== userId.toString()) {
        return res.status(404).json({ error: "Chat not found" });
      }
      currentChat.messages.push(userMessage._id, aiMessage._id);
    } else {
      currentChat = new Chat({
        userId,
        title: prompt.substring(0, 30),
        messages: [userMessage._id, aiMessage._id]
      });
    }

    await currentChat.save();
    res.status(201).json({ aiResponse: aiText, chat: currentChat });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};


export const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat || chat.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: "Chat not found" });
        }
        await Message.deleteMany({ _id: { $in: chat.messages } });
        await Chat.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// import Chat from '../models/chatModel.js';
// import Message from '../models/messageModel.js';
// import { genAI } from '../lib/gemini.js';

// // @desc    Get all of a user's chats (titles and IDs only)
// // @route   GET /api/chats
// // @access  Private
// export const getMyChats = async (req, res) => {
//   try {
//     const chats = await Chat.find({ userId: req.user._id }).sort({ updatedAt: -1 }).select('title');
//     res.status(200).json(chats);
//   } catch (error) {
//     console.error("Error in getMyChats:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // @desc    Get a specific chat by its ID with all messages
// // @route   GET /api/chats/:id
// // @access  Private
// export const getChatById = async (req, res) => {
//   try {
//     const chat = await Chat.findById(req.params.id).populate('messages');
//     if (!chat || chat.userId.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ error: "Chat not found" });
//     }
//     res.status(200).json(chat);
//   } catch (error) {
//     console.error("Error in getChatById:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // @desc    Generate a response and save the conversation
// // @route   POST /api/chats/generate
// // @access  Private
// export const generateChatResponse = async (req, res) => {
//   const { prompt, chatId } = req.body;
//   const userId = req.user._id;

//   if (!prompt) {
//     return res.status(400).json({ message: "Prompt is required" });
//   }

//   try {
//     // 1. Create and save the user's message
//     const userMessage = await Message.create({ role: "user", content: prompt });

//     // ✨ FIX: Reverted to the simpler, more reliable method for generating content.
//     // The previous method of sending conversation history was causing the error.
//     // This version is stateless and robust.
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-1.5-flash-latest",
//     });
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const aiText = response.text();
    
//     // 3. Create and save the AI's message
//     const aiMessage = await Message.create({ role: "model", content: aiText });

//     let currentChat;
//     if (chatId) {
//       // If continuing an existing chat, find it
//       currentChat = await Chat.findById(chatId);
//       if (!currentChat || currentChat.userId.toString() !== userId.toString()) {
//         return res.status(404).json({ error: "Chat not found" });
//       }
//       currentChat.messages.push(userMessage._id, aiMessage._id);
//     } else {
//       // If it's a new chat, create it
//       currentChat = new Chat({
//         userId,
//         title: prompt.substring(0, 30),
//         messages: [userMessage._id, aiMessage._id]
//       });
//     }

//     await currentChat.save();
//     res.status(201).json({ aiResponse: aiText, chat: currentChat });
//   } catch (error) {
//     console.error('Error in generateChatResponse:', error);
//     res.status(500).json({ error: "Failed to generate response" });
//   }
// };

// // @desc    Delete a chat
// // @route   DELETE /api/chats/:id
// // @access  Private
// export const deleteChat = async (req, res) => {
//     try {
//         const chat = await Chat.findById(req.params.id);
//         if (!chat || chat.userId.toString() !== req.user._id.toString()) {
//             return res.status(404).json({ error: "Chat not found" });
//         }
//         // Also delete the associated messages
//         await Message.deleteMany({ _id: { $in: chat.messages } });
//         await Chat.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: "Chat deleted successfully" });
//     } catch (error) {
//         console.error("Error in deleteChat:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
