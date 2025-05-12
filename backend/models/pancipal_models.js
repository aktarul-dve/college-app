import mongoose, { Types } from "mongoose";

const pancipalSchema = new mongoose.Schema({


    name:{
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

export const Pancipal = mongoose.model("Pancipal",pancipalSchema)