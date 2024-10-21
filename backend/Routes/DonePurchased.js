/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import { DonePurchasedModel } from "../Models/DonePurchased.js";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();
router.post(
  "/api/DonePurchased",
  upload.array("picture", 5),
  async (req, res) => {
    try {
      const {
        userId,
        sellerId,
        sellerName,
        productId,
        sellerEmail,
        prodName,
        message,
        quantity,
        buyerName,
        buyerEmail,
        image,
        status,
        total,
        types,
        sellerFacebook,
        buyerFacebook,
        picture,
        price,
        accountType,
        tax,
      } = req.body;
      const imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
      const newImages = new DonePurchasedModel({
        userId,
        sellerId,
        sellerName,
        productId,
        sellerEmail,
        prodName,
        message,
        quantity,
        buyerName,
        buyerEmail,
        status,
        total,
        types,
        sellerFacebook,
        buyerFacebook,
        picture: imageUrls,
        price,
        accountType,
        image,
        tax,
      });
      await newImages.save();
    } catch (error) {
      console.log("Error uploading images", error);
      res.status(500).json({ success: false, error: "Failed to upload" });
    }
  }
);

export default router;
