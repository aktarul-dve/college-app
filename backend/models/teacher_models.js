import mongoose, { Types } from "mongoose";

const teacherSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true,
       
    },
    department:{
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

export const Teacher = mongoose.model("Teacher",teacherSchema)