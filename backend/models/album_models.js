import mongoose, { Types } from "mongoose";

const albumeSchema = new mongoose.Schema({
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

export const Albume = mongoose.model("Albume",albumeSchema)