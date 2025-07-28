import Chat from '../models/chatModel.js'
import User from '../models/userModel.js'
import Message from '../models/messageModel.js'
import { genAI } from '../lib/gemini.js'

// get all of user chats ( just titles and id )

export const getMyChats = async ( req , res ) => {
    try {
        const chats = await Chat.find({ userId : req.user._id }).select('title');
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({ error : "Internal server error" })
    }
}

// get a specific chat by its id with all its messages

export const getChatById = async ( req , res ) => {
    try {
        const chat = await Chat.findById(req.params.id).populate('messages')

        if( !chat || chat.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({ error : "chat not found "})
        }

        res.status(201).json(chat)
    } catch (error) {
        res.status(501).json({ error : "Internal server error" })
    }
} 

// generate a response and save the conversation 

export const generateChatResponse = async (req,res) => {
    const { prompt , chatId } = req.body;
    const userId = req.user._id;

    if (!prompt){
        return res.status(401).json({ message : "Prompt is required" });
    }

    try {
        const userMessage = await Message.create({ role : "user" , content: prompt });


        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiText = response.text();

        const aiMessage = await Message.create({ role: "model" , content : aiText });

        let currentChat;

        // if it's an existing chat, find it and add new messages.
        if ( chatId ) {
            currentChat = await Chat.findById(chatId);
            currentChat.messages.push(userMessage._id , aiMessage._id);
        } else {
            // if it's a new chat create it 
            currentChat = new Chat({
                userId,
                title : prompt.substring(0 , 30), // shuru ke 30 character show karega as a title.
                messages : [userMessage._id , aiMessage._id]
            })
        }

        await currentChat.save(); 

        res.status(201).json({ aiResponse : aiText , chat : currentChat})
     } catch (error) {
        console.log(`error in chatcontroller`);
        res.status(501).json({ error : "failed to generate response "})
    }
}