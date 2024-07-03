/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import { FacultyuserVerification } from "./Middlewares/AuthMiddleware.js";
import { userVerification } from "./Middlewares/AuthMiddleware.js";
import authRoute from "./Routes/AuthRoute.js"
import { UserModel } from "./Models/UserModel.js";
import { FacultyModel } from "./Models/FacultyUsers.js";
dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("MonggoDB Successfull connection:")).catch((err)=>{
    console.log(err);
});

const PORT = 4000;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


app.get('/', (req, res) => res.send(`Server is ready`));
app.use("/", authRoute);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


