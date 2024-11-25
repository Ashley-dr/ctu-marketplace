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

import jwt from "jsonwebtoken";
import crypto from "crypto";
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
router.post("/send-message", upload.single("image"), async (req, res) => {
  try {
    const { senderEmail, receiverEmail, message } = req.body;
    const file = req.file ? req.file.path : null;

    // Find receiver details (name and image) from User or Faculty model
    const receiver =
      (await UserModel.findOne({ email: receiverEmail })) ||
      (await FacultyModel.findOne({ email: receiverEmail }));
    const receiverName = receiver ? receiver.fullname : null;
    const receiverImage = receiver ? receiver.image : null;

    // Find sender details (name and image) from User or Faculty model
    const sender =
      (await UserModel.findOne({ email: senderEmail })) ||
      (await FacultyModel.findOne({ email: senderEmail }));
    const senderName = sender ? sender.fullname : null;
    const senderImage = sender ? sender.image : null;

    // Create new message
    const newMessage = new MessageModel({
      senderEmail,
      receiverEmail,
      message,
      file,
      receiverName,
      receiverImage,
      senderName,
      senderImage,
    });

    // Save message to the database
    await newMessage.save();

    // Trigger Pusher or any real-time functionality
    pusher.trigger("chat-channel", "message", {
      senderEmail,
      receiverEmail,
      message,
      file,
      receiverName,
      receiverImage,
      senderName,
      senderImage,
    });

    res.status(200).json("Message sent successfully");
  } catch (error) {
    console.error("Message send error:", error);
    res.status(500).json({ message: "Message sending failed", error });
  }
});
router.get("/get-message/:senderEmail/:receiverEmail", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Error 403: Access denied. No token provided." });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedToken;
    const user =
      (await UserModel.findById(id).select("email")) ||
      (await FacultyModel.findById(id).select("email"));
    if (!user) {
      return res
        .status(403)
        .json({ message: "Error 403: Unauthorized access." });
    }
    const { email } = user;
    const { senderEmail, receiverEmail } = req.params;

    if (email !== senderEmail) {
      return res
        .status(403)
        .json({ message: "Error 403: Unauthorized to access its messages." });
    }

    // Query messages
    const message = await MessageModel.find({
      $or: [
        { senderEmail: senderEmail, receiverEmail: receiverEmail },
        { senderEmail: receiverEmail, receiverEmail: senderEmail },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(message);
  } catch (error) {
    console.error("Error to receive a message:", error);
    res
      .status(500)
      .json({ message: "Error 500: Internal server error.", error });
  }
});

router.delete("/delete-message/:id", async (req, res) => {
  MessageModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error to delete message", err);
    });
});

router.get("/get-senders/:email", async (req, res) => {
  MessageModel.aggregate([
    { $match: { receiverEmail: req.params.email } },
    {
      $group: {
        _id: "$senderEmail",
        senderName: { $last: "$senderName" },
        senderImage: { $last: "$senderImage" },
        timestamp: { $last: "$timestamp" },
        message: { $last: "$message" },
      },
    },
    {
      $project: {
        _id: 0,
        senderEmail: "$_id",
        senderName: 1,
        senderImage: 1,
        timestamp: 1,
        message: 1,
      },
    },
  ])
    .then((result) => {
      if (result.length === 0) {
        return res.status(200).json({ senders: [], count: 0 });
      }
      res.status(200).json({ senders: result, count: result.length });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching senders", err });
    });
});
export default router;
