/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";

import { ProductModel } from "../Models/Products.js";
import { v2 as cloudinary } from "cloudinary";
import upload from "../config/Cloudinary.js";
import { RefundModel } from "../Models/Refund.js";

const router = express.Router();
router.post("/refund-item", upload.array("itemFile", 5), async (req, res) => {
  try {
    const {
      orderId,
      buyerName,
      buyerEmail,
      contactNumber,
      sellerName,
      sellerEmail,
      productName,
      itemTotalPaid,
      itemQuantity,
      returnReason,
      returnPaymentMethod,
    } = req.body;
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
    const refundItemSave = new RefundModel({
      orderId,
      buyerName,
      buyerEmail,
      contactNumber,
      sellerName,
      sellerEmail,
      productName,
      itemTotalPaid,
      itemQuantity,
      returnReason,
      returnPaymentMethod,
      itemFile: imageUrls,
    });
    await refundItemSave.save();
    res.status(200).json({
      success: true,
      message: "Refund item submitted successfully",
      itemFile: imageUrls,
    });
  } catch (error) {
    console.log("Error uploading images", error);
    res.status(500).json({ success: false, error: "Failed to upload" });
  }
});
export default router;
