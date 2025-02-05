import mongoose, { Schema } from "mongoose";

const messageSchema=new Schema({
    senderId:{
        type:String,
        required:true
    },
    recieverId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

},{timestamps:true})