import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    name:{
       type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    message:{
        type:String,
        required:true
    }
})
const Message=mongoose.model('Message',messageSchema);
export default Message;

