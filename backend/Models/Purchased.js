/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import mongoose from "mongoose";


const purchasedSchema = new mongoose.Schema({
//  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 userId: { type: String },
 sellerId: {
    type: String,
 },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
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
    type: String ,
  
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
chat: [
    {
      chats: { type: String },
      chats2: {type: String},
      senderName: { type: String },
         senderName2: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
});

export const PurchasedModel = mongoose.model("Purchased", purchasedSchema);