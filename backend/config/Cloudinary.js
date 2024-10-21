/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer configuration for file upload
const cloudstorage = multer.memoryStorage();
const cloudupload = multer({ cloudstorage });

// Cloudinary configuration

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder in Cloudinary where files will be stored
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
  },
});

const upload = multer({ storage: storage });
export default upload;
