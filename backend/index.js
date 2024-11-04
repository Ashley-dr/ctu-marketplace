/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import authRoute from "./Routes/AuthRoute.js";
import addCartRoute from "./Routes/AddCart.js";
import DonePurchasedRoute from "./Routes/DonePurchased.js";
import FacultyRoute from "./Routes/FacultyRoute.js";
import UserRoute from "./Routes/UsersRoute.js";
import ProductRoute from "./Routes/Products.js";
import MessageRoute from "./Routes/MessageRoute.js";
import { createServer } from "http";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MonggoDB Successfull connection:"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 4000;
const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "https://cebutechmarketplace.com" || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: ["https://marketplace-ctu.onrender.com"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client/build"));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send(`Server is ready`));
app.use("/", authRoute);
app.use("/", addCartRoute);
app.use("/", DonePurchasedRoute);
app.use("/", FacultyRoute);
app.use("/", UserRoute);
app.use("/", ProductRoute);
app.use("/", MessageRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
