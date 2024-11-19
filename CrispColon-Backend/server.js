import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import url from 'url';



import User from './models/User.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';


dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());


app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,
}));


const model=(url,image)=> {
  const processingTime = Math.random() * 2 + 1;
  const isCancerous = Math.random() > 0.5;
  const confidence = Math.random(); 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        prediction: isCancerous ? 'Cancerous' : 'Non-cancerous',
        confidence: confidence,
        processingTime: processingTime.toFixed(2),
      });
    }, processingTime * 1000);
  });
}


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


const authenticate = (req, res, next) => {
    
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send('Unauthorized (No token)');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
    catch (err) {
      return res.status(401).json({ message: 'Invalid or Expired token' });

    }
};


//x-ray handling multer configuration

// Check and create uploads directory, first getting system specific file path and then extracting directory name and then joining upload with it
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = process.env.NODE_ENV === "production" ? '/tmp' : __dirname;
const uploadsDir = path.join(baseDir, 'uploads'); // Use absolute path
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize Multer
const upload = multer({ storage: storage });



//configuring cloudinary
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});


//to check uploading x-ray
app.post("/api/upload",authenticate, upload.single("file"), async (req, res) => {
   const imagePath = req.file.path;
   try {
    // const form = new FormData();
    //form.append("file", fs.createReadStream(imagePath));
    // Send the image to the Flask server
    // const response = await axios.post("https://cancer-detection-model.onrender.com/predict", form, {
    //   headers: form.getHeaders(),
    // });
    // const prediction = response.data.prediction;
    // console.log("Prediction:", prediction);
    
     const prediction =  JSON.stringify(await model("https://cancer-detection-model.onrender.com/predict",imagePath));
     


    // Upload the image to Cloudinary
    const x = await cloudinary.uploader.upload(imagePath);
    console.log(x);


    // Clean up the uploaded image file
    fs.unlinkSync(imagePath);


    //updating user check history and finding user with help of cookie system
    const user = await User.findOne({_id:req.user.id});
    console.log(req.user);
    console.log(user);
    if (user) {
      console.log(user);
      user.history.push({ 
        date: new Date(), 
        images: [x.secure_url], // Push the image URL
        predictedResult: prediction 
      });

      await user.save();
      console.log("User history updated:", user.history);
    }
    
    res.json({ success: true, prediction, user });
  } catch (error) {
    console.error("Error sending image to Python model:", error);
    res.status(500).json({ success: false, error: "Prediction failed" });
  }
});


//making function to handle profile photo as middleware
const handleProfilePhoto = async (req, res) => {
  const profilePic = req.file.path;
  try{
    // Uploading the image to Cloudinary
    const x = await cloudinary.uploader.upload(profilePic);
    console.log(x);

    // Clean up the uploaded image file
    fs.unlinkSync(profilePic);


    // finding user with help of cookie system
    const user = await User.findOne({_id:req.user.id});

    //update profile pic
    if (user) {
      user.profilePic = x.secure_url;
      await user.save();
    }
    res.json({ success: true, profilePic: x.secure_url, user });
  } catch (error) {
    console.error("Error updating profile photo:", error);
    res.status(500).json({ success: false, error: "Profile Updation failed" });
  }
};

app.get('/check-auth', authenticate, (req, res) => {
  res.status(200).json({ message: 'Authenticated', user: req.user });
});

// Routes
app.use('/api', authRoutes);
app.put('/profile/update-picture',authenticate, upload.single("file"),handleProfilePhoto);
app.use('/profile',authenticate,profileRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
