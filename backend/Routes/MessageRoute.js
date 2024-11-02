/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// chat.js
import express from "express";

import { MessageModel } from "../Models/Message.js";
import { UserModel } from "../Models/UserModel.js";
import { FacultyModel } from "../Models/FacultyUsers.js";
import dotenv from "dotenv";
import Pusher from "pusher";
import upload from "../config/Cloudinary.js";
dotenv.config();
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET_KEY,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});
// import {
//   createChannel,
//   generateStreamToken,
// } from "../Controllers/AuthControllers.js";

const router = express.Router();

// router.post("/api/chat-channel", createChannel);
// router.post("/generate-stream-token", generateStreamToken);
router.post("/api/send-message", upload.single("image"), async (req, res) => {
  try {
    const { senderEmail, receiverEmail, message } = req.body;
    const file = req.file ? req.file.path : null; // Get file URL if uploaded
    const newMessage = new MessageModel({
      senderEmail,
      receiverEmail,
      message,
      file,
    });
    await newMessage.save();
    pusher.trigger("chat-channel", "message", {
      senderEmail,
      receiverEmail,
      message,
      file,
    });
    res.status(200).json("Message send: ");
  } catch (error) {
    console.log("Message sent error", error);
  }
});
router.get("/api/get-message/:senderEmail/:receiverEmail", async (req, res) => {
  try {
    const { senderEmail, receiverEmail } = req.params;
    const message = await MessageModel.find({
      $or: [
        { senderEmail: senderEmail, receiverEmail: receiverEmail },
        { senderEmail: receiverEmail, receiverEmail: senderEmail },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error to receive a message: ", error);
  }
});
router.delete("/api/delete-message/:id", async (req, res) => {
  MessageModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error to delete message", err);
    });
});

export default router;
