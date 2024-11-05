/* eslint-disable no-undef */
import mongoose from "mongoose";
// const commentSchema = new mongoose.Schema({
//   userCommenterName: {
//     type: String,

//   },
//   comment: {
//     type: [String],

//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

const productSchema = new mongoose.Schema({
  sellerId: {
    type: String,
  },
  sellerName: {
    type: String,
  },
  stocks: {
    type: Number,
  },
  prodName: {
    type: String,
  },

  sellerEmail: {
    type: String,
  },
  facebook: {
    type: String,
  },

  description: {
    type: String,
  },
  image: {
    type: [String],
  },
  comments: [
    {
      comment: { type: String },
      commenterImage: { type: String },
      commenterId: { type: String },
      commenterAccountType: { type: String },
      commenterEmail: { type: String },
      commenterName: { type: String, required: true },
      createdAt: { type: Date, default: new Date() },
    },
  ],
  price: {
    type: Number,
  },
  marketType: {
    type: String,
  },
  categories: [
    {
      type: String,
    },
  ],
  accountType: {
    type: String,
  },
  sellerPhoneNumber: {
    type: Number,
  },
  sellerGcashNumber: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
