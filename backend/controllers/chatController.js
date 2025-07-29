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
    const userMessage = await Message.create({ role: "user", content: prompt });
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();
    
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
