import mongoose, { Types } from "mongoose";

const newsSchema = new mongoose.Schema({
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
    tital:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export const News = mongoose.model("News",newsSchema)