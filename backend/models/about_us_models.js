import mongoose, { Types } from "mongoose";

const AboutUsSchema = new mongoose.Schema({
    about_us:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        
    }
})

export const AboutUs = mongoose.model("About_Us",AboutUsSchema);