/* eslint-disable no-undef */
import mongoose from "mongoose";

const RefundSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  buyerName: {
    type: String,
  },
  buyerEmail: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  sellerName: {
    type: String,
  },
  sellerEmail: {
    type: String,
  },
  productName: {
    type: String,
  },
  itemTotalPaid: {
    type: Number,
  },
  itemQuantity: {
    type: Number,
  },
  returnReason: {
    type: String,
  },
  returnPaymentMethod: {
    type: String,
  },
  itemFile: {
    type: [String],
  },

  status: {
    type: String,
  },
  staffReply: {
    type: String,
  },
});

export const RefundModel = mongoose.model("Refund", RefundSchema);
