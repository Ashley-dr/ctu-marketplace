/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { UserModel } from "../Models/UserModel.js";
import { FacultyModel } from "../Models/FacultyUsers.js";
// Faculty users model //
const router = express.Router();
router.get("/faculty", (req, res) => {
  FacultyModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
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
  FacultyModel.findOne({ email: req.params.email })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error to fetch this account", err);
    });
});
// Faculty users Model //

export default router;
