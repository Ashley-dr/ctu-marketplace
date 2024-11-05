/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  ForgotPassword,
  Login,
  ResetPassword,
  Signup,
} from "../Controllers/AuthControllers.js";
import express from "express";
import dotenv from "dotenv";
import { userVerification } from "../Middlewares/AuthMiddleware.js";
import { FacultyuserVerification } from "../Middlewares/AuthMiddleware.js";
import { FacultySignup } from "../Controllers/AuthControllers.js";

dotenv.config();
const router = express.Router();

router.post("/signup", Signup);
router.post("/facultysignup", FacultySignup);
router.post("/login", Login);
router.post("/userspost", userVerification);
router.post("/facultypost", FacultyuserVerification);
router.post("/userResetPassword", ResetPassword);
router.post("/userForgotPassword", ForgotPassword);
router.post("/logout", (req, res) => {
  // Clear the token cookie by setting an expired date
  res.clearCookie("token", {
    httpOnly: true, // Ensures cookie is not accessible by JavaScript
    secure: true, // Ensures cookie is sent over HTTPS in production
    sameSite: "none", // Needed for cross-origin requests
  });

  // Send a response to indicate the user has logged out
  res.json({ success: true, message: "Logged out successfully" });
});
export default router;
