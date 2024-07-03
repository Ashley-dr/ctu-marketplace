/* eslint-disable no-unused-vars */
import dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config()  
const accountStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "marketplace",
    },
});
export default accountStorage;