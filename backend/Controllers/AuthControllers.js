/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { FacultyModel } from "../Models/FacultyUsers.js";
import { UserModel } from "../Models/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    const faculty = await FacultyModel.findOne({ email });
    if (!user && !faculty) {
      return res.status(404).json({ message: "User not found" });
    }

    let resetToken, resetTokenExpiration;
    let accountType; // To track whether it's user or faculty

    if (user) {
      // Generate reset token for user
      resetToken = crypto.randomBytes(20).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
      await user.save();
      accountType = "user";
    }

    if (faculty) {
      // Generate reset token for faculty
      resetToken = crypto.randomBytes(20).toString("hex");
      faculty.resetToken = resetToken;
      faculty.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
      await faculty.save();
      accountType = "faculty";
    }

    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    // Email body
    const mailView = `
      <html>
        <body>
          <h2>Password Reset</h2>
          <p>You requested a password reset for your account on CTU Marketplace.</p>
          <p>Use the following reset code: <strong>${resetToken}</strong></p>
          <p>This code is valid for 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: mailView,
    });

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    return res
      .status(500)
      .json({ message: "Error sending password reset email" });
  }
};
export const ResetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find user by reset token and check if token has expired
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // Check if token is still valid
    });
    const faculty = await FacultyModel.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user && !faculty) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    // const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      user.password = password;
      user.resetToken = undefined; // Remove token after password reset
      user.resetTokenExpiration = undefined;
      await user.save();
    }
    if (faculty) {
      faculty.password = password;
      faculty.resetToken = undefined; // Remove token after password reset
      faculty.resetTokenExpiration = undefined;
      await faculty.save();
    }

    return res
      .status(200)
      .json({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.error("Error in reset-password route:", error);
    return res.status(500).json({ message: "Error changing password" });
  }
};

export const Signup = async (req, res, next) => {
  try {
    const {
      email,
      isBuyer,
      idNumber,
      password,
      username,
      facebook,
      fullname,
      department,
      image,
      gender,
      course,
      phoneNumber,
      validId,
      shopImage,
      shopDescription,
      gcashNumber,
      isUser,
      address,
      createdAt,
    } = req.body;
    const existFaculty = await FacultyModel.findOne({ email });
    const existingUser = await UserModel.findOne({ email });
    if (existingUser || existFaculty) {
      return res.status(400).json({ message: "Account already exists" });
    }
    const existFacultyfullname = await FacultyModel.findOne({ fullname });
    const existingUserfullname = await UserModel.findOne({ fullname });
    if (existingUserfullname || existFacultyfullname) {
      return res
        .status(400)
        .json({ message: "This fullname already registerd" });
    }

    const existFacultyPhoneNumber = await FacultyModel.findOne({ phoneNumber });
    const existingUserPhoneNumber = await UserModel.findOne({ phoneNumber });
    if (existingUserPhoneNumber || existFacultyPhoneNumber) {
      return res
        .status(400)
        .json({ message: "This phone number already registered." });
    }

    const existFacultyUsername = await FacultyModel.findOne({
      username,
    });
    const existingUserUsername = await UserModel.findOne({ username });
    if (existFacultyUsername || existingUserUsername) {
      return res.status(400).json({ message: "This Username already exists." });
    }

    const existingUserIDNumber = await UserModel.findOne({ idNumber });
    if (existingUserIDNumber) {
      return res
        .status(400)
        .json({ message: "This CTU ID Number already registered." });
    }

    const user = await UserModel.create({
      email,
      isBuyer,
      idNumber,
      password,
      username,
      facebook,
      fullname,
      department,
      image,
      gender,
      course,
      phoneNumber,
      isUser: "Student",
      validId,
      address,
      shopImage,
      shopDescription,
      gcashNumber,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: `User signed up successfully ${email}`,
      success: true,
      user,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const FacultySignup = async (req, res, next) => {
  try {
    const {
      email,
      isBuyer,
      password,
      username,
      fullname,
      facebook,
      image,
      gender,
      phoneNumber,
      isFaculty,

      validId,
      shopImage,
      shopDescription,
      gcashNumber,
      address,
      createdAt,
    } = req.body;
    const existingUser = await UserModel.findOne({ email });
    const existFaculty = await FacultyModel.findOne({ email });

    if (existingUser || existFaculty) {
      return res.status(400).json({ message: "Account already exists" });
    }
    const existFacultyfullname = await FacultyModel.findOne({ fullname });
    const existingUserfullname = await UserModel.findOne({ fullname });
    if (existingUserfullname || existFacultyfullname) {
      return res.status(400).json({ message: "This fullname already created" });
    }
    const existFacultyFacebook = await FacultyModel.findOne({ facebook });
    const existingUserFacebook = await UserModel.findOne({ facebook });
    if (existingUserFacebook || existFacultyFacebook) {
      return res
        .status(400)
        .json({ message: "This facebook Link already registered" });
    }
    const existFacultyPhoneNumber = await FacultyModel.findOne({ phoneNumber });
    const existingUserPhoneNumber = await UserModel.findOne({ phoneNumber });
    if (existingUserPhoneNumber || existFacultyPhoneNumber) {
      return res
        .status(400)
        .json({ message: "This phone number already registered." });
    }

    const facultyuser = await FacultyModel.create({
      email,
      isBuyer,
      password,
      username,
      fullname,
      facebook,
      image,
      gender,
      phoneNumber,
      isFaculty: "Faculty",

      validId,
      shopImage,
      address,
      shopDescription,
      gcashNumber,
      createdAt,
    });
    const token = createSecretToken(facultyuser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: `User signed up successfully ${email}`,
      success: true,
      facultyuser,
    });
    // next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    // Student Authentication
    const user = await UserModel.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true, // Only for HTTPS; required for Render's hosted environment
          sameSite: "None", // Required for cross-domain cookies with credentials
        });
        return res.json({
          message: `Student logged in successfully ${email}`,
          success: true,
        });
        //  next()
      }
    }
    // Student Authentication

    // Faculty Authentication
    const facultyuser = await FacultyModel.findOne({ email });
    if (facultyuser) {
      const authfaculty = await bcrypt.compare(password, facultyuser.password);
      if (authfaculty) {
        const token = createSecretToken(facultyuser._id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true, // Only for HTTPS; required for Render's hosted environment
          sameSite: "None", // Required for cross-domain cookies with credentials
        });
        return res.json({
          message: `Staff logged in successfully ${email}`,
          success: true,
        });
        //  next()
      }
    }
    // Faculty Authentication

    return res.json({ message: "Incorrect password or email" });
  } catch (error) {
    console.error(error);
    // Handle errors and send an appropriate response
    return res.status(500).json({ message: "Internal server error" });
  }
};
