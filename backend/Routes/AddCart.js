/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { PurchasedModel } from "../Models/Purchased.js";
import axios from "axios";
const router = express.Router();
// item purchased add to cart //

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_BASE_URL = "https://api.paymongo.com/v1";

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

router.put("/purchasedItem/:id", upload.single("image"), (req, res) => {
  PurchasedModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: "Unable to update" });
    });
});
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
router.delete("/orders/:id", (req, res) => {
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
