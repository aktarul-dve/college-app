import mongoose, { Types } from "mongoose";

const sliderSchema = new mongoose.Schema({
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

export const Slider = mongoose.model("Slider",sliderSchema)