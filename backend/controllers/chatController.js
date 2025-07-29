import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import { genAI } from '../lib/gemini.js';

// @desc    Get all of a user's chats (titles and IDs only)
// @route   GET /api/chats
// @access  Private
export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).select('title');
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getMyChats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Get a specific chat by its ID with all messages
// @route   GET /api/chats/:id
// @access  Private
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('messages');

    if (!chat || chat.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error in getChatById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Generate a response and save the conversation
// @route   POST /api/chats/generate
// @access  Private
export const generateChatResponse = async (req, res) => {
  const { prompt, chatId } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    // 1. Create and save the user's message
    const userMessage = await Message.create({ role: "user", content: prompt });

    // ✨ FIX: Switched back to the 'flash' model to avoid rate-limiting issues on the free tier.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: "You are CogniChat, a helpful and friendly AI assistant. Your goal is to provide clear, concise, and accurate information to the user.",
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    // 3. Create and save the AI's message
    const aiMessage = await Message.create({ role: "model", content: aiText });

    let currentChat;

    if (chatId) {
      // If continuing an existing chat, find it
      currentChat = await Chat.findById(chatId);

      if (!currentChat || currentChat.userId.toString() !== userId.toString()) {
        return res.status(404).json({ error: "Chat not found" });
      }
      
      currentChat.messages.push(userMessage._id, aiMessage._id);

    } else {
      // If it's a new chat, create it
      currentChat = new Chat({
        userId,
        title: prompt.substring(0, 30), // Use first 30 chars as title
        messages: [userMessage._id, aiMessage._id]
      });
    }

    await currentChat.save();

    res.status(201).json({ aiResponse: aiText, chat: currentChat });

  } catch (error) {
    console.error("Error in generateChatResponse:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
