/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import { DonePurchasedModel } from "../Models/DonePurchased.js";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { PurchasedModel } from "../Models/Purchased.js";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel } from "../Models/UserModel.js";
dotenv.config();

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_BASE_URL = "https://api.paymongo.com/v1";
const router = express.Router();

router.post("/DonePurchased", upload.array("picture", 5), async (req, res) => {
  try {
    const {
      userId,
      sellerId,
      cartId,
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
      buyerPhoneNumber,
      sellerPhoneNumber,
      buyerGcashNumber,
      sellerGcashNumber,
      buyerType,
      transactionStatus,
    } = req.body;
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
    const newImages = new DonePurchasedModel({
      userId,
      sellerId,
      cartId,
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
      buyerPhoneNumber,
      sellerPhoneNumber,
      buyerGcashNumber,
      sellerGcashNumber,
      buyerType,
      transactionStatus,
    });
    await newImages.save();
  } catch (error) {
    console.log("Error uploading images", error);
    res.status(500).json({ success: false, error: "Failed to upload" });
  }
});
router.get("/DonePurchased", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Error 403: Access denied. No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decodedToken.id).select("isAdmin");
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Error 403." });
    }
    DonePurchasedModel.find()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(403)
        .json({ message: "Error 403: Invalid or expired token." });
    }
    res.status(500).json({ message: "Error 500: Server error.", error });
  }
});
router.put("/DonePurchased/:id", async (req, res) => {
  const { transactionStatus } = req.body;

  DonePurchasedModel.findByIdAndUpdate(
    req.params.id,
    { transactionStatus },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.put("/transactionStatus/:id", async (req, res) => {
  const { transactionStatus } = req.body;

  PurchasedModel.findByIdAndUpdate(
    req.params.id,
    { transactionStatus },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/DonePurchased/:id", async (req, res) => {
  try {
    const deleteProduct = await DonePurchasedModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProduct) {
      return res.status(404).json({ error: "Unable to delete this product." });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
});
router.get("/item-sold/:id", async (req, res) => {
  DonePurchasedModel.aggregate(
    [
      { $match: { sellerId: req.params.id, transactionStatus: "Success" } },
      { $group: { _id: "$sellerId", count: { $sum: 1 } } },
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
  )
    .then((result) => {
      if (result.length === 0) {
        return res.status(200).json({ count: 0 });
      }
      res.status(200).json({ count: result[0].count });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in fetching order count", err });
    });
});
export default router;
