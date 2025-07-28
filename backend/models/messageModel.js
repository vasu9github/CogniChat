import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type:String,
        enum: ['user' , 'model'],
        required:true,
    },
    content: {
        type:String,
        required:true
    }
}, { timestamps:true })

const Message = mongoose.model("Message" , messageSchema);
export default Message;