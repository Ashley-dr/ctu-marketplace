/* eslint-disable no-undef */
import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
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
amount: {
    type: Number,
    required: true,
},
address: { type: Object},

  createdAt: {
    type: Date,
    default: new Date(),
  },
});



export const OrderModel = mongoose.model("Order", OrderSchema);
