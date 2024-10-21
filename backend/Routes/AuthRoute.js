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

export default router;
