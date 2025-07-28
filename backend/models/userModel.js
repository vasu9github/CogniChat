import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required : true,
        unique : true
    },
    fullName : {
        type:String,
        required:true
    },
    googleId: {
        type:String,
        required:true,
        unique: true
    },
    profilePic : {
        type:String,
        required:false
    }
}, {
    timestamps:true
})

const User = mongoose.model("User" , userSchema)
export default User;