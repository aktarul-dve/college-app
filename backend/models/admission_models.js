// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  nature: {
    type: String, // e.g. "Admission", "Form Fillup"
    required: true
  },
  educationLevel: {
    type: String, // e.g. "Higher Secondary", "Degree (Pass)"
    required: true
  },
  session: {
    type: String, // e.g. "2021-2022"
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  actionUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
