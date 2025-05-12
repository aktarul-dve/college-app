import mongoose, { Types } from "mongoose";

// Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String,
         required: true
         },
    father_name: {
         type: String,
         required:true

     }, 
    educationLevel: { 
        type:String,
        required: true 
    },
    department: { 
        type: String, 
        required: true 
    },

    session :{
        type : String,
        required :true
    }
    
});

export const Student = mongoose.model('Student', studentSchema);
