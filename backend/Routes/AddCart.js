/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { PurchasedModel } from "../Models/Purchased.js";
const router = express.Router();
// item purchased add to cart //
router.post("/api/chats/:id", async (req, res) => {
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

router.post("/api/purchasedItem", (req, res) => {
  PurchasedModel.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("error", err);
    });
});
router.get("/api/user-orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PurchasedModel.aggregate(
      [
        { $match: { userId: id } },
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
router.get("/api/user-orders", async (req, res) => {
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
router.put("/api/purchasedItem/:id", upload.single("image"), (req, res) => {
  PurchasedModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: "Unable to update" });
    });
});
router.get("/api/transactions/:sellerId", (req, res) => {
  PurchasedModel.find({ sellerId: req.params.sellerId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.get("/api/transaction-count/:id", async (req, res) => {
  PurchasedModel.aggregate(
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
router.get("/api/orders/:userId", (req, res) => {
  PurchasedModel.find({ userId: req.params.userId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error to get orders", err);
    });
});
router.delete("/api/orders/:id", (req, res) => {
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
