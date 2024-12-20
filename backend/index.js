/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import helmet from "helmet";

import authRoute from "./Routes/AuthRoute.js";
import addCartRoute from "./Routes/AddCart.js";
import DonePurchasedRoute from "./Routes/DonePurchased.js";
import FacultyRoute from "./Routes/FacultyRoute.js";
import UserRoute from "./Routes/UsersRoute.js";
import ProductRoute from "./Routes/Products.js";
import MessageRoute from "./Routes/MessageRoute.js";
import RefundRoute from "./Routes/RefundRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(
  cors({
    origin: ["https://cebutechmarketplace.com", "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "https://cebutechmarketplace.com", // Replace with your frontend URL
//     credentials: true, // Allows cookies to be sent
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from "dist"
app.use(express.static(path.join(__dirname, "../dist")));

// API routes
app.use(helmet());
app.use("/", authRoute);
app.use("/api", addCartRoute);
app.use("/api", DonePurchasedRoute);
app.use("/api", FacultyRoute);
app.use("/api", UserRoute);
app.use("/api", ProductRoute);
app.use("/api", MessageRoute);
app.use("/api", RefundRoute);
// Fallback route to serve index.html for non-API requests
app.get("/*", function (req, res) {
  // Only return index.html for non-API routes
  if (!req.url.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
