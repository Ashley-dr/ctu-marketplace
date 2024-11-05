/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import { DonePurchasedModel } from "../Models/DonePurchased.js";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();
router.post("/DonePurchased", upload.array("picture", 5), async (req, res) => {
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
      buyerPhoneNumber,
      sellerPhoneNumber,
      buyerGcashNumber,
      sellerGcashNumber,
      buyerType,
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
      buyerPhoneNumber,
      sellerPhoneNumber,
      buyerGcashNumber,
      sellerGcashNumber,
      buyerType,
    });
    await newImages.save();
  } catch (error) {
    console.log("Error uploading images", error);
    res.status(500).json({ success: false, error: "Failed to upload" });
  }
});
router.get("/DonePurchased", async (req, res) => {
  DonePurchasedModel.find()
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
      { $match: { sellerId: req.params.id } },
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
