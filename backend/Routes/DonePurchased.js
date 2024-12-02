/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import { DonePurchasedModel } from "../Models/DonePurchased.js";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { PurchasedModel } from "../Models/Purchased.js";
import nodemailer from "nodemailer";
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD_APP_EMAIL, // App password from Gmail
  },
});

router.put("/DonePurchased/:id", async (req, res) => {
  try {
    const updatedTransactionStatus = await DonePurchasedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransactionStatus) {
      return res.status(404).json({ error: "transaction ID not found" });
    }
    if (updatedTransactionStatus.transactionStatus === "Item Received") {
      const mailView = `
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Item Dropped Off</h2>
    <p>Dear ${updatedTransactionStatus.sellerEmail},</p>
    <p>We are pleased to inform you that your item has been successfully dropped off. Below are the details of the transaction:</p>
    
    <ul>
      <li><strong>Product Name:</strong> ${updatedTransactionStatus.prodName}</li>
      <li><strong>Buyer Name:</strong> ${updatedTransactionStatus.buyerName}</li>
      <li><strong>Buyer Email:</strong> ${updatedTransactionStatus.buyerEmail}</li>
      <li><strong>Quantity:</strong> ${updatedTransactionStatus.quantity}</li>
      <li><strong>Price (per item):</strong> P${updatedTransactionStatus.price}</li>
      <li><strong>Total Earned:</strong> P${updatedTransactionStatus.tax}</li>
      <li><strong>Date of Purchase:</strong> ${updatedTransactionStatus.createdAt}</li>
    </ul>
    
    <p>Please wait for the buyer to claim this item. Once claimed, our team will notify you promptly.</p>
    
    <p>After the buyer has claimed the item and completed the checkout process, our system will automatically transfer the payment to your account.</p>
    
    <p><strong>Important:</strong> If the item is not claimed within 3 days, you are welcome to contact us to arrange for the item to be returned to you.</p>
    
    <p>Thank you for using our platform. Should you have any questions, feel free to reach out to our support team.</p>
    
    <p>Best regards,</p>
    <p><strong>cebutechmarketplace.com</strong></p>
    <p style="font-size: 0.9em; color: #666;">For assistance, please contact us at cebutechmarketplace@gmail.com.</p>
  </body>
</html>
    `;
      transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedTransactionStatus.sellerEmail, // Recipient email
        subject: "Item Dropped off.", // Subject line
        html: mailView, // HTML content
      });

      res.status(200).json("Item Dropped off.");
    }

    if (updatedTransactionStatus.transactionStatus === "Success") {
      const mailView = `
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Transaction Complete</h2>
      <p>Dear ${updatedTransactionStatus.sellerEmail},</p>
      <p>We are pleased to inform you that the transaction for your product has been successfully completed. Below are the details of the transaction:</p>
      
      <ul>
        <li><strong>Product Name:</strong> ${updatedTransactionStatus.prodName}</li>
        <li><strong>Buyer Name:</strong> ${updatedTransactionStatus.buyerName}</li>
        <li><strong>Buyer Email:</strong> ${updatedTransactionStatus.buyerEmail}</li>
        <li><strong>Quantity:</strong> ${updatedTransactionStatus.quantity}</li>
        <li><strong>Price (per item):</strong> P${updatedTransactionStatus.price}</li>
        <li><strong>Total Earned:</strong> P${updatedTransactionStatus.tax}</li>
        <li><strong>Date of Purchase:</strong> ${updatedTransactionStatus.createdAt}</li>
      </ul>
      
      <p>The item has now been successfully claimed by ${updatedTransactionStatus.buyerName}.</p>
      
      <p>To proceed with receiving your earnings, please reply to this email and specify your preferred payment method:</p>
      <ul>
        <li><strong>E-Payment:</strong> Provide your bank account or e-wallet details.</li>
        <li><strong>Meet-up Claim:</strong> Specify a convenient time and location.</li>
      </ul>
      
      <p>Thank you for using our platform. We look forward to assisting you with future transactions.</p>
      
      <p>Best regards,</p>
      <p><strong>cebutechmarketplace.com</strong></p>
      <p style="font-size: 0.9em; color: #666;">For any further questions, please contact our support team at cebutechmarketplace@gmail.com.</p>
    </body>
  </html>
  `;
      transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedTransactionStatus.sellerEmail, // Recipient email
        subject: "Transaction Complete.", // Subject line
        html: mailView, // HTML content
      });

      res.status(200).json("Item Transaction Success.");
    }

    if (updatedTransactionStatus.transactionStatus === "Item Returned") {
      const mailView = `
      <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #FF5722;">Item Return Notification - Product ID: ${updatedTransactionStatus.productId}</h2>
    <p>Dear ${updatedTransactionStatus.sellerEmail},</p>
    <p>We hope this message finds you well. We regret to inform you that there has been an issue with one of the items purchased through our marketplace platform. After review, it has been determined that the item must be returned to you due to the following reason(s):</p>
    
    <ul>
      <li><strong>Product Name:</strong> ${updatedTransactionStatus.prodName}</li>
      <li><strong>Buyer Name:</strong> ${updatedTransactionStatus.buyerName}</li>
      <li><strong>Buyer Email:</strong> ${updatedTransactionStatus.buyerEmail}</li>
      <li><strong>Quantity:</strong> ${updatedTransactionStatus.quantity}</li>
      <li><strong>Price (per item):</strong> P${updatedTransactionStatus.price}</li>
      <li><strong>Total Earned:</strong> P${updatedTransactionStatus.tax}</li>
      <li><strong>Date of Purchase:</strong> ${updatedTransactionStatus.createdAt}</li>
    </ul>
    
    <p><strong>Reasons for Return:</strong></p>
    <ul>
      <li>The item received was defective/damaged.</li>
      <li>The item does not match the description on the product page.</li>
      <li>The wrong item was sent.</li>
      <li>Buyer is requesting to return the item.</li>
      <li>The item was not claimed within 3 days.</li>
      <li>This transaction was flagged as a potential bogus purchase.</li>
    </ul>
    
    <p><strong>To prevent similar issues in the future, we recommend the following:</strong></p>
    <ul>
      <li>Interact or verify your customer’s identity directly before completing transactions.</li>
    </ul>
    
    <p>We value your cooperation in resolving this issue promptly to maintain a positive experience for our buyers and sellers. If you have any questions or need further clarification, please feel free to contact us directly at cebutechmarketplace@gmail.com</p>
    
    <p>Best regards,</p>
    <p><strong>CebuMarketplace-Danao Team</strong></p>
    <p style="font-size: 0.9em; color: #666;">This email was sent to ${updatedTransactionStatus.sellerEmail}. For support, please reach out to our help center.</p>
  </body>
</html>
    `;
      transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedTransactionStatus.sellerEmail, // Recipient email
        subject: "Item to Return.", // Subject line
        html: mailView, // HTML content
      });

      res.status(200).json("Item Returned.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user to seller." });
  }
});

router.put("/transactionStatus/:id", async (req, res) => {
  try {
    const updatedTransactionStatus = await PurchasedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransactionStatus) {
      return res.status(404).json({ error: "transaction ID not found" });
    }
    if (updatedTransactionStatus.transactionStatus === "Item Received") {
      const mailView = `
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Item Dropped Off</h2>
    <p>Dear ${updatedTransactionStatus.buyerEmail},</p>
    <p>We are pleased to inform you that your item has been successfully dropped off and ready to be claimed. Below are the details of the transaction:</p>
    
    <ul>
      <li><strong>Product Name:</strong> ${updatedTransactionStatus.prodName}</li>
      <li><strong>Seller Name:</strong> ${updatedTransactionStatus.sellerName}</li>
      <li><strong>Seller Email:</strong> ${updatedTransactionStatus.sellerEmail}</li>
      <li><strong>Quantity:</strong> ${updatedTransactionStatus.quantity}</li>
      <li><strong>Price (per item):</strong> P${updatedTransactionStatus.price}</li>
      <li><strong>Total Amount:</strong> P${updatedTransactionStatus.total}</li>
      <li><strong>Date of Purchase:</strong> ${updatedTransactionStatus.createdAt}</li>
    </ul>
    
    <p>Please proceed to claim this item you purchase in CTU - Danao (COT Building) temporary designated area.</p> 
    
    <p>Thank you for using our platform. Should you have any questions, feel free to reach out to our support team.</p>
    
    <p>Best regards,</p>
    <p><strong>cebutechmarketplace.com</strong></p>
    <p style="font-size: 0.9em; color: #666;">For assistance, please contact us at cebutechmarketplace@gmail.com.</p>
  </body>
</html>
    `;
      transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedTransactionStatus.buyerEmail, // Recipient email
        subject: "Item Dropped off.", // Subject line
        html: mailView, // HTML content
      });

      res.status(200).json("Item Dropped off.");
    }
    if (updatedTransactionStatus.transactionStatus === "Success") {
      const mailView = `
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Item claimed.</h2>
    <p>Dear ${updatedTransactionStatus.buyerEmail},</p>
    <p>Thank you for purchasing from ${updatedTransactionStatus.sellerName}</p>
    <p>Details below:</p>
    <ul>
      <li><strong>Product Name:</strong> ${updatedTransactionStatus.prodName}</li>
      <li><strong>Seller Name:</strong> ${updatedTransactionStatus.sellerName}</li>
      <li><strong>Seller Email:</strong> ${updatedTransactionStatus.sellerEmail}</li>
      <li><strong>Quantity:</strong> ${updatedTransactionStatus.quantity}</li>
      <li><strong>Price (per item):</strong> P${updatedTransactionStatus.price}</li>
      <li><strong>Total Amount:</strong> P${updatedTransactionStatus.total}</li>
      <li><strong>Date of Purchase:</strong> ${updatedTransactionStatus.createdAt}</li>
    </ul>
    </br>
    <p>Shop more in cebutechmarketplace.com</p>
    </br>
    <p>Thank you for using our platform. Should you have any questions, feel free to reach out to our support team.</p>
    
    <p>Best regards,</p>
    <p><strong>cebutechmarketplace.com</strong></p>
    <p style="font-size: 0.9em; color: #666;">For assistance, please contact us at cebutechmarketplace@gmail.com.</p>
  </body>
</html>
    `;
      transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedTransactionStatus.buyerEmail, // Recipient email
        subject: "Item Transaction Complete.", // Subject line
        html: mailView, // HTML content
      });

      res.status(200).json("Item Dropped off.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user to seller." });
  }
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
