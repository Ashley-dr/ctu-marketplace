/* eslint-disable no-undef */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  fullname: {
    type: String,
  },

  address: {
    type: String,
  },

  image: {
    type: String,
  },
  gender: {
    type: String,
  },
  department: {
    type: String,
  },
  facebook: {
    type: String,
  },

  course: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  validId: {
    type: String,
  },
  shopImage: {
    type: String,
  },
  shopDescription: {
    type: String,
  },
  gcashNumber: {
    type: Number,
  },
  isSeller: {
    type: Boolean,
  },
  isUser: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  idNumber: {
    type: Number,
  },
  isBuyer: {
    type: Boolean,
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: String },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export const UserModel = mongoose.model("User", UserSchema);
