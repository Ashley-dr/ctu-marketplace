/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import mongoose from "mongoose";

const DonepurchasedSchema = new mongoose.Schema({
  //  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: { type: String },
  sellerId: {
    type: String,
  },
  productId: {
    type: String,
  },
  prodName: {
    type: String,
  },
  sellerName: {
    type: String,
  },
  sellerEmail: {
    type: String,
  },
  accountType: {
    type: String,
  },
  message: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  buyerName: {
    type: String,
  },
  buyerEmail: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
  total: {
    type: Number,
  },
  types: {
    type: String,
  },
  sellerFacebook: {
    type: String,
  },
  buyerFacebook: {
    type: String,
  },
  buyerPhoneNumber: {
    type: Number,
  },
  buyerGcashNumber: {
    type: Number,
  },
  sellerPhoneNumber: {
    type: Number,
  },
  sellerGcashNumber: {
    type: Number,
  },
  buyerType: {
    type: String,
  },
  picture: {
    type: [String],
  },
  tax: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const DonePurchasedModel = mongoose.model(
  "DonePurchased",
  DonepurchasedSchema
);
