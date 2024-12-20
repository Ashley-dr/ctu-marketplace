/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import upload from "../config/Cloudinary.js";
import { UserModel } from "../Models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import { FacultyModel } from "../Models/FacultyUsers.js";
import nodemailer from "nodemailer";
import { createSecretToken } from "../util/SecretToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
dotenv.config();
const router = express.Router();

// Users model //
router.get("/users", async (req, res) => {
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
    const users = await UserModel.find(
      {},
      {
        password: 0,
        resetToken: 0,
        resetTokenExpiration: 0,
        isAdmin: 0,
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
// router.get("/asokarap", (req, res) => {
//   UserModel.find({ isAdmin: { $exists: true } }, { isAdmin: 1 })
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log("Error to fetch this account", err);
//     });
// });
router.get("/mamaligyaay", (req, res) => {
  UserModel.find(
    { isSeller: true },
    { email: 1, image: 1, username: 1, isSeller: 1, _id: 1 }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error to fetch this account", err);
      res.status(500).json({ message: "Internal server error", error: err });
    });
});

// router.put("/usersSellerUpdate/:id", (req, res) => {
//   UserModel.findByIdAndUpdate(req.params.id, req.body)
//     .then((result) => {
//       res.json("Student user has been a seller successfully,");
//     })
//     .catch((err) => {
//       console.log("Cannot be a seller.");
//     });
// });
// Set up nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD_APP_EMAIL, // App password from Gmail
  },
});

router.put("/usersSellerUpdate/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    if (updatedUser.isSeller === true) {
      // Create the email content
      const mailView = `
      <html>
        <body>
          <h2>Congratulations! Your Seller Account Has Been Approved</h2>
          <p>Dear ${updatedUser.fullname},</p>
          <p>We are pleased to inform you that your request to become a seller on our platform has been approved.</p>
          <p>Your account has been updated, and you now have access to seller-specific features and tools.</p>
          <p>As a seller, you can:</p>
          <ul>
            <li>List and manage your products or services.</li>
            <li>Interact with customers directly.</li>
         
          </ul>
          <br/>
          <strong>Important Notes:</strong>
          <ul>
            <li>Please review our Seller Guidelines to ensure compliance with our policies.</li>
            <li>If you encounter any issues, feel free to reach out to our support team at cebutechmarketplace@gmail.com.</li>
          </ul>
          <p>We are excited to have you onboard and look forward to your success as part of our seller community!</p>
          <p>Best Regards,</p>
          <p>The CebuTech Marketplace Team</p>
          <p><a href="https://cebutechmarketplace.com">cebutechmarketplace.com</a></p>
        </body>
      </html>
    `;

      // Send the email
      await transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedUser.email, // Recipient email
        subject: "Seller Account Approved", // Subject line
        html: mailView, // HTML content
      });

      res
        .status(200)
        .json("User has been updated to seller successfully, and email sent.");
    }
    if (updatedUser.isSeller === false) {
      const mailView = `
      <html>
        <body>
          <h2>Your Requested Account to be a Seller declined.</h2>
          <p>Dear ${updatedUser.fullname},</p>
          <p>We are pleased to inform you that your request to become a seller on our platform are declined.</p>
          <p>Due to not sending exact requirements you well have to attach file again to complete.</p>
         
          <br/>
          <strong>Important Notes:</strong>
          <ul>
            <li>Please review our Seller Guidelines to ensure compliance with our policies.</li>
            <li>If you encounter any issues, feel free to reach out to our support team at cebutechmarketplace@gmail.com.</li>
          </ul>
          <p>We are excited to have you onboard and look forward to your success as part of our seller community!</p>
          <p>Best Regards,</p>
          <p>The CebuTech Marketplace Team</p>
          <p><a href="https://cebutechmarketplace.com">cebutechmarketplace.com</a></p>
        </body>
      </html>
     `;

      // Send the email
      await transporter.sendMail({
        from: `"CebuTech Marketplace" <${process.env.EMAIL}>`, // Sender name and email
        to: updatedUser.email, // Recipient email
        subject: "Seller Account Declined", // Subject line
        html: mailView, // HTML content
      });

      res.status(200).json("User Declined, and email sent.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user to seller." });
  }
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
  UserModel.findOne(
    { email: req.params.email },
    { password: 0, resetToken: 0, resetTokenExpiration: 0, isAdmin: 0 }
  )
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
      const existingUser = await UserModel.findById(req.params.id);
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
