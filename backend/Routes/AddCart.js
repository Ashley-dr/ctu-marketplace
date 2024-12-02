/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { PurchasedModel } from "../Models/Purchased.js";
import nodemailer from "nodemailer";
import axios from "axios";
const router = express.Router();
// item purchased add to cart //

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_BASE_URL = "https://api.paymongo.com/v1";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD_APP_EMAIL, // App password from Gmail
  },
});

router.post("/create-payment", async (req, res) => {
  try {
    const { userId, productId, sellerId, buyerName, buyerEmail, total } =
      req.body;

    // Create a payment source for GCash
    const response = await axios.post(
      `${PAYMONGO_BASE_URL}/sources`,
      {
        data: {
          attributes: {
            amount: total * 100, // Convert total to centavos
            currency: "PHP",
            type: "gcash",
            redirect: {
              success: "http://localhost:3000/success",
              failed: "http://localhost:3000/failed",
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    const gcashRedirectUrl =
      response.data.data.attributes.redirect.checkout_url;
    const paymentIntentId = response.data.data.id;

    // Save the payment details in the database
    const newOrder = new PurchasedModel({
      userId,
      sellerId,
      productId,
      buyerName,
      buyerEmail,
      total,
      paymentIntentId,
      gcashRedirectUrl,
      status: "pending",
    });

    await newOrder.save();

    res.status(200).json({ gcashRedirectUrl });
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res.status(500).json({ success: false, error: "Failed to create payment" });
  }
});

router.post("/chats/:id", async (req, res) => {
  const chatsvar = await PurchasedModel.findById(req.params.id);
  const newChat = {
    chats: req.body.chats,
    chats2: req.body.chats2,
    senderName: req.body.senderName,
    senderName2: req.body.senderName2,
    createdAt: new Date(),
  };
  chatsvar.chat.push(newChat);
  await chatsvar.save();
  res.json(newChat);
});

router.post("/purchasedItem", upload.single("tradeImage"), (req, res) => {
  PurchasedModel.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.post("/tradeItem", upload.single("tradeImage"), async (req, res) => {
  try {
    const tradeImageUrl = req.file.path;

    const newItem = { ...req.body, tradeImage: tradeImageUrl };

    const result = await PurchasedModel.create(newItem);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating purchased item:", error);
    res.status(500).json({ message: "Error creating purchased item", error });
  }
});
router.get("/user-orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PurchasedModel.aggregate(
      [
        {
          $match: {
            userId: id,
            transactionStatus: { $eq: undefined }, // Filter where transactionStatus is undefined
          },
        },
        { $group: { _id: "$userId", count: { $sum: 1 } } },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );
    if (result.length === 0) {
      return res.status(200).json({ count: 0 });
    }

    res.status(200).json({ count: result[0].count });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching order count", error });
  }
});
router.get("/transaction-count/:id", async (req, res) => {
  PurchasedModel.aggregate(
    [
      {
        $match: {
          sellerId: req.params.id,
          transactionStatus: { $exists: false },
          status: { $in: ["E-Payment", "Meet up Pay"] },
        },
      },
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

router.get("/user-orders", async (req, res) => {
  try {
    const result = await PurchasedModel.aggregate(
      [
        {
          $group: {
            _id: "$userId",
            count: { $sum: 1 },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );
    if (result.length === 0) {
      return res.status(200).json({ count: 0 });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching order count", error });
  }
});

router.put("/purchasedItem/:id", upload.single("image"), async (req, res) => {
  try {
    const cartUpdate = await PurchasedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!cartUpdate) {
      return res.status(404).json({ error: "transaction ID not found" });
    }

    const mailView = `
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Subject: New Order Received </h2>
    <p>Dear ${cartUpdate.sellerEmail},</p>
    <p>Congratulations! You have received a new order on CebuTech Marketplace.</p>
    </br>
        <p>New Orders Details:</p>
    <ul>
      <li><strong>Product name:</strong> ${cartUpdate.prodName}</li>
      <li><strong>Buyer Name:</strong>   ${cartUpdate.buyerName}</li>
      <li><strong>Buyer Email:</strong>  ${cartUpdate.buyerEmail}</li>
      <li><strong>Buyer type:</strong>   ${cartUpdate.buyerType}</li>
      <li><strong>Buyer #:</strong>      ${cartUpdate.buyerPhoneNumber}</li>
      <li><strong>Status:</strong>       ${cartUpdate.status}</li>
      <li><strong>Quantity:</strong>     ${cartUpdate.quantity}</li>
      <li><strong>Price:</strong>        P${cartUpdate.price}</li>
      <li><strong>Total:</strong>        P${cartUpdate.total}</li>
      <li><strong>Market Type:</strong>  ${cartUpdate.marketType}</li>
      <li><strong>Message:</strong>      ${cartUpdate.message}</li>
    </ul>
    </br>
    <p>Please follow the steps below to fulfill the order:</p>
    <ul>
      <li><strong>Prepare the Item:</strong> Ensure that the item is packaged securely.</li>
       <li><strong>Drop-Off Location:</strong> You can drop off the item at the COT area or the TGO office within 1-3 business days, or as per the schedule agreed upon with the buyer using our chat feature.</li>
    </ul>
    <p>Best regards,</p>
    <p><strong>cebutechmarketplace.com</strong></p>
    <p style="font-size: 0.9em; color: #666;">For assistance, please contact us at cebutechmarketplace@gmail.com.</p>
  </body>
</html>
    `;
    transporter.sendMail({
      from: cartUpdate.buyerEmail, // Sender name and email
      to: cartUpdate.sellerEmail, // Recipient email
      subject: "New Orders [Item Purchased].", // Subject line
      html: mailView, // HTML content
    });

    res.status(200).json("Item Dropped off.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user to seller." });
  }
});
// router.put("/purchasedItem/:id", upload.single("image"), (req, res) => {
//   PurchasedModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.status(400).json({ error: "Unable to update" });
//     });
// });
router.get("/transactions/:sellerId", (req, res) => {
  PurchasedModel.find({ sellerId: req.params.sellerId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/orders/:userId", (req, res) => {
  PurchasedModel.find({ userId: req.params.userId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error to get orders", err);
    });
});

router.delete("/orders/:id", async (req, res) => {
  try {
    const deleteOrder = await PurchasedModel.findByIdAndDelete(req.params.id);
    if (!deleteOrder) {
      return res.status(404).json({ error: "Order ID Not found" });
    }

    const mailView = `
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Subject: Order Canceled</h2>
    <p>Dear ${deleteOrder.sellerEmail},</p>
    <p>Unfortunately this order ${deleteOrder.prodName} by ${deleteOrder.buyerName} has been Canceled this order</p>
    </br>
        <p>Orders Details:</p>
    <ul>
      <li><strong>Product name:</strong> ${deleteOrder.prodName}</li>
      <li><strong>Buyer Name:</strong>   ${deleteOrder.buyerName}</li>
      <li><strong>Buyer Email:</strong>  ${deleteOrder.buyerEmail}</li>
      <li><strong>Buyer type:</strong>   ${deleteOrder.buyerType}</li>
      <li><strong>Buyer #:</strong>      ${deleteOrder.buyerPhoneNumber}</li>
      <li><strong>Status:</strong>       ${deleteOrder.status}</li>
      <li><strong>Quantity:</strong>     ${deleteOrder.quantity}</li>
      <li><strong>Price:</strong>        P${deleteOrder.price}</li>
      <li><strong>Total:</strong>        P${deleteOrder.total}</li>
      <li><strong>Market Type:</strong>  ${deleteOrder.marketType}</li>
      <li><strong>Message:</strong>      ${deleteOrder.message}</li>
    </ul>
    </br>
    <p>To be informed why canceled:</p>
    <ul>
      <li>Contact this Buyer: ${deleteOrder.buyerEmail}</li>
    </ul>
    <p>Best regards,</p>
    <p><strong>cebutechmarketplace.com</strong></p>
    <p style="font-size: 0.9em; color: #666;">For assistance, please contact us at cebutechmarketplace@gmail.com.</p>
  </body>
</html>
    `;
    transporter.sendMail({
      from: deleteOrder.buyerEmail, // Sender name and email
      to: deleteOrder.sellerEmail, // Recipient email
      subject: "Buyer Canceled Order.", // Subject line
      html: mailView, // HTML content
    });
    res.status(200).json(".");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
});

router.delete("/ordersTransaction/:id", (req, res) => {
  PurchasedModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error to delete", err);
    });
});
// item purchased add to cart //

export default router;
