/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { UserModel } from "../Models/UserModel.js";
import { FacultyModel } from "../Models/FacultyUsers.js";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
dotenv.config();

// Faculty users model //
const router = express.Router();
router.get("/faculty", async (req, res) => {
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
    const users = await FacultyModel.find(
      {},
      {
        password: 0,
        resetToken: 0,
        resetTokenExpiration: 0,
      }
    );
    res.json(users);
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
router.get("/faculty-mamaligyaay", (req, res) => {
  FacultyModel.find(
    { isSeller: true },
    { email: 1, image: 1, username: 1, isSeller: 1, _id: 0 }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error to fetch this account", err);
      res.status(500).json({ message: "Internal server error", error: err });
    });
});
router.put("/facultySellerUpdate/:id", (req, res) => {
  FacultyModel.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json("Faculty member has been a seller successfully,");
    })
    .catch((err) => {
      console.log("Cannot be a seller.");
    });
});
router.get("/faculty/:id", (req, res) => {
  FacultyModel.findById(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error");
    });
});
router.delete("/faculty/:id", (req, res) => {
  FacultyModel.findByIdAndDelete(req.params.id, req.body)
    .then((result) => {
      res.json({ mgs: "Faculty user deleted" });
    })
    .catch((err) => {
      console.log("Error to delete faculty user", err);
    });
});

router.put(
  "/faculty/:id",
  upload.fields([
    { name: "validId", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        email,
        username,
        fullname,
        address,
        gender,
        facebook,
        phoneNumber,
        shopDescription,
        gcashNumber,
        isSeller,
      } = req.body;
      const { image, validId, shopImage } = req.files;
      const existingUser = await FacultyModel.findById(req.params.id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      // Function to upload a single image to Cloudinary
      const uploadToCloudinary = async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url; // Get the secure URL of the uploaded image
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          throw new Error("Failed to upload image");
        }
      };

      // Upload images to Cloudinary
      const imageUrl = image
        ? await uploadToCloudinary(image[0])
        : existingUser.image;
      const validIdUrl = validId
        ? await uploadToCloudinary(validId[0])
        : existingUser.validId;
      const shopImageUrl = shopImage
        ? await uploadToCloudinary(shopImage[0])
        : existingUser.shopImage;

      // Update user data with Cloudinary URLs
      const updatedUser = await FacultyModel.findByIdAndUpdate(
        req.params.id,
        {
          email,
          username,
          fullname,
          address,
          gender,
          facebook,
          phoneNumber,
          shopDescription,
          gcashNumber,
          isSeller,
          image: imageUrl,
          validId: validIdUrl,
          shopImage: shopImageUrl,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ msg: "User data updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).json({ message: "Cannot update user data" });
    }
  }
);

router.put("/facultyEmail/:id", async (req, res) => {
  try {
    const { email } = req.body;

    const existFaculty = await FacultyModel.findOne({ email });
    const existingUser = await UserModel.findOne({ email });
    if (existingUser || existFaculty) {
      return res.status(400).json({ message: "Account already exists" });
    }
    const updatedUser = await FacultyModel.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ msg: "User data updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Cannot update user data" });
  }
});

router.put("/facultyNumbers/:id", async (req, res) => {
  try {
    const { phoneNumber, gcashNumber } = req.body;

    const existFacultyPhoneNumber = await FacultyModel.findOne({
      phoneNumber,
    });
    const existingUserPhoneNumber = await UserModel.findOne({
      phoneNumber,
    });
    if (existingUserPhoneNumber || existFacultyPhoneNumber) {
      return res
        .status(400)
        .json({ message: "This phone number already registered." });
    }

    const existFacultyGcashNumber = await FacultyModel.findOne({
      gcashNumber,
    });
    const existUserGcashNumber = await UserModel.findOne({
      gcashNumber,
    });
    if (existUserGcashNumber || existFacultyGcashNumber) {
      return res
        .status(400)
        .json({ message: "This Gcash Number already registered." });
    }
    const updatedUser = await FacultyModel.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, gcashNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ msg: "User data updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Cannot update user data" });
  }
});
router.get("/faculty-account/:email", async (req, res) => {
  FacultyModel.findOne(
    { email: req.params.email },
    { password: 0, resetToken: 0, resetTokenExpiration: 0 }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error to fetch this account", err);
    });
});
// Faculty users Model //

export default router;
