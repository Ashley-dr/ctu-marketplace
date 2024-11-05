/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { UserModel } from "../Models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import { FacultyModel } from "../Models/FacultyUsers.js";
const router = express.Router();
// Users model //
router.get("/users", (req, res) => {
  UserModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.put("/usersSellerUpdate/:id", (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json("Student user has been a seller successfully,");
    })
    .catch((err) => {
      console.log("Cannot be a seller.");
    });
});

router.delete("/users/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, req.body)
    .then((result) => {
      res.json({ mgs: "User Deleted" });
    })
    .catch((err) => {
      console.log("Error to delete this user", err);
    });
});
router.get("/users/:id", (req, res) => {
  UserModel.findById(req.params.id, req.body, req.file)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error");
    });
});
router.get("/user-account/:email", async (req, res) => {
  UserModel.findOne({ email: req.params.email })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error to fetch this account", err);
    });
});

router.put("/userEmail/:id", async (req, res) => {
  try {
    const { email } = req.body;

    const existFaculty = await FacultyModel.findOne({ email });
    const existingUser = await UserModel.findOne({ email });
    if (existingUser || existFaculty) {
      return res.status(400).json({ message: "Account already exists" });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
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

router.put("/userNumbers/:id", async (req, res) => {
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
    const updatedUser = await UserModel.findByIdAndUpdate(
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

router.put("/ctuId/:id", async (req, res) => {
  try {
    const { idNumber } = req.body;
    const existingUserIDNumber = await UserModel.findOne({ idNumber });
    if (existingUserIDNumber) {
      return res
        .status(400)
        .json({ message: "This CTU ID Number already registered." });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { idNumber },
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

router.put(
  "/users/:id",
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
        department,
        facebook,
        course,
        phoneNumber,
        shopDescription,
        gcashNumber,
        isSeller,
      } = req.body;
      const { image, validId, shopImage } = req.files;

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
      const imageUrl = image ? await uploadToCloudinary(image[0]) : null;
      const validIdUrl = validId ? await uploadToCloudinary(validId[0]) : null;
      const shopImageUrl = shopImage
        ? await uploadToCloudinary(shopImage[0])
        : null;

      // Update user data with Cloudinary URLs
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          email,
          username,
          fullname,
          address,
          gender,
          department,
          facebook,
          course,
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

// Users model //

export default router;
