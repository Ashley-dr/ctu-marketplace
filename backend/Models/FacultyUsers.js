import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const FacultySchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  fullname: {
    type: String,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  facebook: {
    type: String,
  },
  address: {
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
  isFaculty: {
    type: String,
  },
  // isBuyer: {
  //   type: Boolean,
  // },
  isUser: {
    type: String,
  },
  isSeller: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  resetToken: { type: String, select: false },
  resetTokenExpiration: { type: String, select: false },
});

FacultySchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export const FacultyModel = mongoose.model("FacultyUsers", FacultySchema);
