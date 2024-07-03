/* eslint-disable no-undef */
import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
userId: {
    type: String,
    required: [true, "Input User Id"],
    unique: true,
  },
  products: [
    {
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }
  ],


  createdAt: {
    type: Date,
    default: new Date(),
  },
});



export const CartModel = mongoose.model("Cart", CartSchema);
