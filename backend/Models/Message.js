/* eslint-disable no-undef */
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    ref: "User",
    required: true,
  },
  receiverEmail: {
    type: String,
    ref: "User",
    required: true,
  },
  senderName: {
    type: String,
  },
  receiverName: {
    type: String,
  },
  senderImage: {
    type: String,
  },
  receiverImage: {
    type: String,
  },
  message: {
    type: String,
    // required: true,
  },
  file: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const MessageModel = mongoose.model("Message", MessageSchema);
