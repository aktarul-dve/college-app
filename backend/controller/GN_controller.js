import { GanarelNotice } from '../models/ganara_notice_models.js';
import { MainNotic} from '../models/main_notic_models.js';
import { AboutUs } from '../models/about_us_models.js';
import { Pancipal } from '../models/pancipal_models.js';
import { Albume } from '../models/album_models.js';
import { News } from '../models/news_models.js';
import {Student} from '../models/Student_models.js'
import { Teacher } from '../models/teacher_models.js';
import { Slider } from '../models/slider_models.js';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";

export const GanarelNotices = async (req, res) => {
  try {
    const { ganarelNotice } = req.body;

    // Validate request body
    if (!ganarelNotice) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Check if a record already exists
    const existingNotice = await GanarelNotice.findOne();

    if (existingNotice) {
      return res.status(400).json({
        message: 'An object already exists. Please delete it before adding a new one.',
      });
    }

    // Create a new record if no existing data
    const newGn = new GanarelNotice({
      ganarelNotice,
    });
    await newGn.save();

    res.status(201).json({ message: 'Data inserted successfully', newGn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during the operation', error });
  }
};
export const GetGnNotice = async (req, res) =>{
  const all = await GanarelNotice.find();
  res.status(200).json(all);
}
export const updatBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const notic = await GanarelNotice.findById(id);
  if (!notic) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // ব্লগ ডেটা আপডেট করা
  const updatednotic = await GanarelNotice.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    updatednotic,
  });
};
export const deleteBlog = async (req,res) =>{
  const {id}=req.params;

  const blog = await GanarelNotice.findById(id);
  if(!blog){
      return res.status(404).json({message:"Blog not found"});
  }

  await blog.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}



export const mainNotice = async (req, res) => {
  try {
      if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no image");
          return res.status(400).json({ message: "User photo is required" });
      }

      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
          return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
      }

      const { date,notic_datils } = req.body;

      if (!date || !notic_datils || !photo) {
          return res.status(400).json({ message: "Please fill all required fields" });
      }

      const user = await MainNotic.findOne({ photo });
      if (user) {
          return res.status(400).json({ message: "Notic already exists" });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(cloudinaryResponse.error);
          return res.status(500).json({ message: "Error uploading photo" });
      }


     

      const main_Notices = new MainNotic({
          date,
          notic_datils,
          photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
          }
      });
      await main_Notices.save();

      if (main_Notices) {
            res.status(201).json({ message: "Notic Insat successfully", main_Notices });
        }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during registration", error });
  }
};
export const GetAllMainNotice = async (req, res) =>{
  const all = await MainNotic.find();
  res.status(200).json(all);
}
export const getSinglenotice = async (req,res) =>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"Invalid Blog id"})
  }
  const blog = await MainNotic.findById(id);
  if(!blog){
      return res.status(404).json({message:"Blog no found"});

  }
  res.status(200).json(blog);
}
export const updatMainNotice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const Mnotice = await MainNotic.findById(id);
  console.log(Mnotice)
  if (!Mnotice) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // যদি নতুন ছবি আসে, তাহলে পুরনো ছবি Cloudinary থেকে মুছে নতুন ছবি আপলোড করুন
  if (req.files && req.files.photo) {
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "শুধু jpg, png, এবং webp ফরম্যাটের ছবি অনুমোদিত" });
    }

    // পুরনো ছবি মুছে ফেলা
    await cloudinary.uploader.destroy(Mnotice.photo.public_id);

    // নতুন ছবি আপলোড
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    req.body.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    };
  }

  // ব্লগ ডেটা আপডেট করা
  const Mnoticedated = await MainNotic.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    Mnoticedated,
  });
};
export const deleteMainNotice = async (req,res) =>{
  const {id}=req.params;

  const blog = await MainNotic.findById(id);
  if(!blog){
      return res.status(404).json({message:"Blog not found"});
  }

  await blog.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}



export const CreateAboutUs = async (req, res) => {

  try {
    const {about_us } = req.body;


    // Validate request body
    if (!about_us ) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Check if a record already exists
    const existingNotice = await AboutUs.findOne();

    if (existingNotice) {
      return res.status(400).json({
        message: 'An object already exists. Please delete it before adding a new one.',
      });
    }
    // Create a new record if no existing data
    const newGn = new AboutUs({
      about_us,
    });
    await newGn.save();
    res.status(201).json({ message: 'Data inserted successfully', newGn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during the operation', error });
  }
};
export const GetAboutUs = async (req, res) =>{
  const all = await AboutUs.find();
  res.status(200).json(all);
}
export const updateAboutUs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const notic = await AboutUs.findById(id);
  if (!notic) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // ব্লগ ডেটা আপডেট করা
  const updatednotic = await AboutUs.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    updatednotic,
  });
};
export const deleteAboutUs = async (req,res) =>{
  const {id}=req.params;

  const blog = await AboutUs.findById(id);
  if(!blog){
      return res.status(404).json({message:"Blog not found"});
  }

  await blog.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}

export const CreatPancipal = async (req, res) => {
  try {

    const existingPrincipal = await Pancipal.findOne();
    if (existingPrincipal) {
        return res.status(400).json({ message: "A Principal already exists. You cannot create another one." });
    }

      if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no image");
          return res.status(400).json({ message: "User photo is required" });
      }
      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
          return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
      }

      const { name } = req.body;

      if (!name || !photo) {
          return res.status(400).json({ message: "Please fill all required fields" });
      }


      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(cloudinaryResponse.error);
          return res.status(500).json({ message: "Error uploading photo" });
      }

      const new_pancipal = new Pancipal({
          name,
          photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
          }
      });
      await new_pancipal.save();

      if (new_pancipal) {
            res.status(201).json({ message: "Notic Insat successfully", new_pancipal });
        }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during registration", error });
  }
};
export const GetPancipal = async (req, res) =>{
  const all = await Pancipal.find();
  res.status(200).json(all);
}
export const UpdatePancipal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const findPancipal = await Pancipal.findById(id);
  if (!findPancipal) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // যদি নতুন ছবি আসে, তাহলে পুরনো ছবি Cloudinary থেকে মুছে নতুন ছবি আপলোড করুন
  if (req.files && req.files.photo) {
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "শুধু jpg, png, এবং webp ফরম্যাটের ছবি অনুমোদিত" });
    }

    // পুরনো ছবি মুছে ফেলা
    await cloudinary.uploader.destroy(findPancipal.photo.public_id);

    // নতুন ছবি আপলোড
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    req.body.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    };
  }

  // ব্লগ ডেটা আপডেট করা
  const newPancipal = await Pancipal.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    newPancipal,
  });
};
export const DeletePancipal = async (req,res) =>{
  const {id}=req.params;

  const pancipalfind = await Pancipal.findById(id);
  if(!pancipalfind){
      return res.status(404).json({message:"Blog not found"});
  }

  await pancipalfind.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}


export const CreatAlbume = async (req, res) => {
  try {
      if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no image");
          return res.status(400).json({ message: "photo is required" });
      }

      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
          return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
      }

      

      if (!photo) {
          return res.status(400).json({ message: "Please fill all required fields" });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(cloudinaryResponse.error);
          return res.status(500).json({ message: "Error uploading photo" });
      }

      const new_albume = new Albume({
        
          photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
          }
      });
      await new_albume.save();

      if (new_albume) {
            res.status(201).json({ message: "Albume Insat successfully", new_albume });
        }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during Albume", error });
  }
};
export const GetAlbume = async (req, res) =>{
  const all = await Albume.find();
  res.status(200).json(all);
}
export const UpdateAlbume = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const findAlbume = await Albume.findById(id);
  if (!findAlbume) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // যদি নতুন ছবি আসে, তাহলে পুরনো ছবি Cloudinary থেকে মুছে নতুন ছবি আপলোড করুন
  if (req.files && req.files.photo) {
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "শুধু jpg, png, এবং webp ফরম্যাটের ছবি অনুমোদিত" });
    }

    // পুরনো ছবি মুছে ফেলা
    await cloudinary.uploader.destroy(findAlbume.photo.public_id);

    // নতুন ছবি আপলোড
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    req.body.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    };
  }

  // ব্লগ ডেটা আপডেট করা
  const new_albume = await Albume.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    new_albume,
  });
};
export const DeleteAlbume = async (req,res) =>{
  const {id}=req.params;

  const Albumefind = await Albume.findById(id);
  if(!Albumefind){
      return res.status(404).json({message:"Blog not found"});
  }

  await Albumefind.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}


export const CreatNews = async (req, res) => {
  try {
      if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no image");
          return res.status(400).json({ message: "photo is required" });
      }

      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
          return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
      }


      const {tital,description} =req.body

      

      if (!photo || !tital || !description) {
          return res.status(400).json({ message: "Please fill all required fields" });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(cloudinaryResponse.error);
          return res.status(500).json({ message: "Error uploading photo" });
      }

      const new_News = new News({
          photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
          },
          tital,
          description,
      });
      await new_News.save();

      if (new_News) {
            res.status(201).json({ message: "Albume Insat successfully", new_News });
        }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during Albume", error });
  }
};
export const GetNews = async (req, res) =>{
  const all = await News.find();
  res.status(200).json(all);
}
export const UpdateNews = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const findNews = await News.findById(id);
  if (!findNews) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // যদি নতুন ছবি আসে, তাহলে পুরনো ছবি Cloudinary থেকে মুছে নতুন ছবি আপলোড করুন
  if (req.files && req.files.photo) {
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "শুধু jpg, png, এবং webp ফরম্যাটের ছবি অনুমোদিত" });
    }

    // পুরনো ছবি মুছে ফেলা
    await cloudinary.uploader.destroy(findNews.photo.public_id);

    // নতুন ছবি আপলোড
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    req.body.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    };
  }

  // ব্লগ ডেটা আপডেট করা
  const new_News = await News.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    new_News,
  });
};
export const DeleteNews = async (req,res) =>{
  const {id}=req.params;

  const Newsfind = await News.findById(id);
  if(!Newsfind){
      return res.status(404).json({message:"Blog not found"});
  }

  await Newsfind.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}



export const CreatTeacher = async (req, res) => {
  try {
      if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no image");
          return res.status(400).json({ message: "photo is required" });
      }

      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
          return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
      }


      const {name,designation,department} =req.body

      

      if (!name || !designation ||  !department  ||  !photo) {
          return res.status(400).json({ message: "Please fill all required fields" });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(cloudinaryResponse.error);
          return res.status(500).json({ message: "Error uploading photo" });
      }

      const new_teacher = new Teacher({
          name,
          designation,
          department,
          photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
          },
          
      });
      await new_teacher.save();

      if (new_teacher) {
            res.status(201).json({ message: "Albume Insat successfully", new_teacher });
        }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during Albume", error });
  }
};
export const GetTeacher = async (req, res) =>{
  const all = await Teacher.find();
  res.status(200).json(all);
}
export const UpdateTeacher = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const findTeacher = await Teacher.findById(id);
  if (!findTeacher) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // যদি নতুন ছবি আসে, তাহলে পুরনো ছবি Cloudinary থেকে মুছে নতুন ছবি আপলোড করুন
  if (req.files && req.files.photo) {
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "শুধু jpg, png, এবং webp ফরম্যাটের ছবি অনুমোদিত" });
    }

    // পুরনো ছবি মুছে ফেলা
    await cloudinary.uploader.destroy(findTeacher.photo.public_id);

    // নতুন ছবি আপলোড
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    req.body.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    };
  }

  // ব্লগ ডেটা আপডেট করা
  const new_Teacher = await Teacher.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    new_Teacher,
  });
};
export const DeleteTeacher = async (req,res) =>{
  const {id}=req.params;

  const Teacherfind = await Teacher.findById(id);
  if(!Teacherfind){
      return res.status(404).json({message:"Blog not found"});
  }

  await Teacherfind.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}







export const CreatStudents = async (req, res) => {
  try {

    const { name,father_name , educationLevel, department, session,  } = req.body;

    const new_student = new Student({
        name,
        father_name,
        educationLevel,
        department,
        session,
       
    });

    await new_student.save();  // MongoDB-তে ছাত্রের ডেটা সেভ হবে
    res.status(201).json({ message: 'ছাত্র সফলভাবে তৈরি হয়েছে', new_student });
      
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during Albume", error });
  }
};
export const getStudents = async (req, res) => {
  try {
    const { educationLevel, department, session } = req.body; // ক্লায়েন্ট থেকে এই তিনটি ভ্যালু নিয়ে আসুন

    // ফিল্টারিং
    const studen = await Student.find({
      educationLevel: educationLevel,
      department: department,
      session: session
    });

    if (!studen.length) {
      return res.status(404).json({ message: "No students found with the provided details." });
    }

    res.status(200).json(studen); // ফিল্টার করা ছাত্রদের রিটার্ন করুন
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching students", error });
  }
};



export const CreatSlider = async (req, res) => {
  try {
      if (!req.files || Object.keys(req.files).length === 0) {
          console.log("no image");
          return res.status(400).json({ message: "photo is required" });
      }

      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
          return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
      }

      

      if (!photo) {
          return res.status(400).json({ message: "Please fill all required fields" });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(cloudinaryResponse.error);
          return res.status(500).json({ message: "Error uploading photo" });
      }

      const new_slider = new Slider({
        
          photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
          }
      });
      await new_slider.save();

      if (new_slider) {
            res.status(201).json({ message: "Albume Insat successfully", new_slider });
        }

      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during Albume", error });
  }
};
export const GetSlider = async (req, res) =>{
  const all = await Slider.find();
  res.status(200).json(all);
}
export const UpdateSlider = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "অকার্যকর ব্লগ আইডি" });
  }

  const findSlider = await Slider.findById(id);
  if (!findSlider) {
    return res.status(404).json({ message: "ব্লগ পাওয়া যায়নি" });
  }

  // যদি নতুন ছবি আসে, তাহলে পুরনো ছবি Cloudinary থেকে মুছে নতুন ছবি আপলোড করুন
  if (req.files && req.files.photo) {
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "শুধু jpg, png, এবং webp ফরম্যাটের ছবি অনুমোদিত" });
    }

    // পুরনো ছবি মুছে ফেলা
    await cloudinary.uploader.destroy(findSlider.photo.public_id);

    // নতুন ছবি আপলোড
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    req.body.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    };
  }

  // ব্লগ ডেটা আপডেট করা
  const new_slider = await Slider.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "ব্লগ সফলভাবে আপডেট হয়েছে",
    new_slider,
  });
};
export const DeleteSlider = async (req,res) =>{
  const {id}=req.params;

  const Sliderfind = await Slider.findById(id);
  if(!Sliderfind){
      return res.status(404).json({message:"Blog not found"});
  }

  await Sliderfind.deleteOne();
  res.status(200).json({message:"Blog deleted Successfully"});
}






















