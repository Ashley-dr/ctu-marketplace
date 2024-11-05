/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";

import { ProductModel } from "../Models/Products.js";
import { v2 as cloudinary } from "cloudinary";
import upload from "../config/Cloudinary.js";

const router = express.Router();
// Add Products //
router.post("/products", upload.array("image", 5), async (req, res) => {
  try {
    const {
      sellerId,
      sellerName,
      stocks,
      sellerEmail,
      prodName,
      description,
      price,
      categories,
      marketType,
      accountType,
      facebook,
      sellerPhoneNumber,
      sellerGcashNumber,
    } = req.body;
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
    const newImages = new ProductModel({
      sellerId,
      sellerName,
      stocks,
      sellerEmail,
      prodName,
      description,
      price,
      categories,
      marketType,
      accountType,
      facebook,
      sellerPhoneNumber,
      sellerGcashNumber,
      image: imageUrls,
    });
    await newImages.save();
  } catch (error) {
    console.log("Error uploading images", error);
    res.status(500).json({ success: false, error: "Failed to upload" });
  }
});

router.get("/products", (req, res) => {
  ProductModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.get("/inventory/:sellerId", (req, res) => {
  ProductModel.find({ sellerId: req.params.sellerId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.put("/inventory/:id", async (req, res) => {
  try {
    const { stocks, price } = req.body;
    await ProductModel.findByIdAndUpdate(
      req.params.id,
      { stocks, price },
      { new: true }
    );
    res.json({ msg: "Price Updated" });
  } catch (error) {
    res.status(400).json({ message: "Cannot change price" });
  }
});

router.delete("/inventory/:id", async (req, res) => {
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ error: "Unable to delete this product." });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
});
router.get("/products/:id", (req, res) => {
  ProductModel.findById(req.params.id, req.body, req.file)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error");
    });
});

router.post("/comments/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  const newComment = {
    commenterImage: req.body.commenterImage,
    comment: req.body.comment,
    commenterAccountType: req.body.commenterAccountType,
    commenterId: req.body.commenterId,
    commenterEmail: req.body.commenterEmail,
    commenterName: req.body.commenterName,
    createdAt: new Date(),
  };
  product.comments.push(newComment);
  await product.save();
  res.json(newComment);
});

router.delete("/comments/:productId/:commentId", async (req, res) => {
  try {
    const { productId, commentId } = req.params;
    const product = await ProductModel.findById(productId);
    product.comments = product.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await product.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
});

router.get("/comments/:productId", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    res.json(product.comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});
router.get("/user-products/:id", async (req, res) => {
  ProductModel.aggregate(
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
router.get("/count-products", async (req, res) => {
  ProductModel.aggregate([{ $group: { _id: "_id", count: { $sum: 1 } } }], {
    maxTimeMS: 60000,
    allowDiskUse: true,
  })
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
// Add Products //

export default router;
