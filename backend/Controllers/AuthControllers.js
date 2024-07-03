/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { FacultyModel } from "../Models/FacultyUsers.js";
import { UserModel } from "../Models/UserModel.js"
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res, next) => {
  try {
    const { email, password, username, facebook,  fullname, department, image, gender, course, phoneNumber, validId, shopImage, shopDescription, gcashNumber,address, createdAt } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await UserModel.create({ email, password, username,facebook, fullname, department, image, gender, course, phoneNumber, validId, address, shopImage, shopDescription, gcashNumber, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};






export const FacultySignup = async (req, res, next) => {
  try {
    const { email, password, username, fullname, facebook, image, gender, phoneNumber, validId, shopImage, shopDescription, gcashNumber, address, createdAt,  } = req.body;
    const existingUser = await FacultyModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const facultyuser = await FacultyModel.create({ email, password, username, fullname, facebook, image, gender, phoneNumber, validId, shopImage,address, shopDescription, gcashNumber,createdAt });
    const token = createSecretToken(facultyuser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};






export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    // Student Authentication
    const user = await UserModel.findOne({ email });
    if(user){
     const auth = await bcrypt.compare(password,user.password)
     if (auth) {
          const token = createSecretToken(user._id);
          res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
     });
     return res.json({ message:`Staff logged in successfully ${email}`, success: true });
    //  next()
        }
    }
    // Student Authentication

    // Faculty Authentication
    const facultyuser = await FacultyModel.findOne({email});
    if(facultyuser){
     const authfaculty = await bcrypt.compare(password,facultyuser.password)
     if (authfaculty) {
          const token = createSecretToken(facultyuser._id);
          res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
     });
     return res.json({ message: `Staff logged in successfully ${email}`, success: true });
    //  next()
    }
    }
     // Faculty Authentication

    return res.json({message:'Incorrect password or email' });
  } catch (error) {
    console.error(error);
    // Handle errors and send an appropriate response
    return res.status(500).json({ message: 'Internal server error' });
  }
}
