import mongoose, { Types } from "mongoose";

const mainNoticeSchema = new mongoose.Schema({

    date:{
        type:Date,
        required:true
    },
    notic_datils:{
        type:String,
        required:true,
       
    },
    photo:{
       public_id :{
        type:String,
        required:true,
       },
       url:{
        type:String,
        required:true,

       }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export const MainNotic = mongoose.model("MainNotic",mainNoticeSchema)