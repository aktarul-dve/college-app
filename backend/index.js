import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import GNROTE from './routes/GN_route.js'
import authRoutes from './routes/auth.js'
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";

import cors from 'cors';



const app = express();
dotenv.config();

const port = process.env.PORT;
const MONGO_URL =process.env.MONGO_URL;

//DB Code

try {
    mongoose.connect(MONGO_URL)
    console.log("Conntected to MongoDB")
    
} catch (error) {
    console.log(error)
    
}

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['https://college-app-one.vercel.app'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));



app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}))

//defining routes
app.use("/api/ganarelNotice",GNROTE)
app.use("/api/auth",authRoutes)

//Cloudinary

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY,  
  api_secret: process.env.CLOUD_SECRET_KEY, 
});

app.listen(port, () => {
  console.log(`Server is runnig on port ${port}`)
})