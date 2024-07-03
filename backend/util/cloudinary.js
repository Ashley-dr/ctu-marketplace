/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary';
dotenv.config()  
cloudinary.config({ 
  cloud_name: 'dxruxxfoa', 
  api_key: '559133875522998', 
  api_secret: 'RcXpXCPa6WJsTZmKxr8zN9Pzlwo' 
});

export default cloudinary;
