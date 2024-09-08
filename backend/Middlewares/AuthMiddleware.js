/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { UserModel } from "../Models/UserModel.js";
import { FacultyModel } from "../Models/FacultyUsers.js";
import dotenv from "dotenv"
import  jwt  from "jsonwebtoken";
dotenv.config();

export const userVerification = (req, res) => {
    const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    }
    else {
      const user = await UserModel.findById(data.id)
      if (user) return res.json({ status: true, user: {id: user._id, isBuyer: user.isBuyer, idNumber: user.idNumber, email: user.email , username: user.username, fullname: user.fullname, department: user.department, facebook: user.facebook, image: user.image, gender: user.gender, validId: user.validId, shopImage: user.shopImage, address: user.address, phoneNumber: user.phoneNumber, gcashNumber: user.gcashNumber, isSeller: user.isSeller, isAdmin: user.isAdmin, isUser: user.isUser} })
      else return res.json({ status: false })
    }  
  })
};

export const FacultyuserVerification = (req, res) => {
    const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    }
    else {
      const user = await FacultyModel.findById(data.id)
      if (user) return res.json({ status: true, user: {id: user._id,address: user.address, isBuyer: user.isBuyer, email: user.email , username: user.username, fullname: user.fullname, facebook: user.facebook, createdAt: user.createdAt, image: user.image, validId: user.validId, shopImage: user.shopImage, gender: user.gender, phoneNumber: user.phoneNumber, gcashNumber: user.gcashNumber, isSeller: user.isSeller, isFaculty: user.isFaculty} })
      else return res.json({ status: false })
    }  
  })
};

// export const FacultyuserVerification = (req, res) => {
//     const token = req.cookies.token
//   if (token) {
// jwt.verify(token, process.env.MONGODB_URI, {}, async (err, data) => {
//     if (err) throw err;
//     res.json(data);
// }) 
// } else {
//   res.json(null);
// }
  
//   };