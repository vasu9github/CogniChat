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


export const generateChatResponse = async (req, res) => {
  const { prompt, chatId } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const userMessage = await Message.create({ role: "user", content: prompt });
    
    let conversationHistory = [];
    if (chatId) {
      const existingChat = await Chat.findById(chatId).populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 10 }
      });
      if (existingChat && existingChat.userId.toString() === userId.toString()) {
        conversationHistory = existingChat.messages.reverse().map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
      }
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: "You are CogniChat, a helpful and friendly AI assistant. Your goal is to provide clear, concise, and accurate information. Keep your answers helpful but not overly long.",
    });
    
    const chatSession = model.startChat({ history: conversationHistory });
    const result = await chatSession.sendMessageStream(prompt);

    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }
    
    const aiMessage = await Message.create({ role: "model", content: fullResponse });

    let currentChat;
    if (chatId) {
      currentChat = await Chat.findById(chatId);
      currentChat.messages.push(userMessage._id, aiMessage._id);
    } else {
      currentChat = new Chat({
        userId,
        title: prompt.substring(0, 30),
        messages: [userMessage._id, aiMessage._id]
      });
    }
    await currentChat.save();

    res.write(`data: ${JSON.stringify({ newChat: currentChat })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Error in generateChatResponse:', error);
    res.write(`data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`);
    res.end();
  }
};

