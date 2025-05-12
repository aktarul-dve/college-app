import mongoose, { Types } from "mongoose";

const GanarelNoticeSchema = new mongoose.Schema({
    ganarelNotice:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        
    }
})

export const GanarelNotice = mongoose.model("GanarelNotice",GanarelNoticeSchema);