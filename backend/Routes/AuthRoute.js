/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Login, Signup } from "../Controllers/AuthControllers.js"
import { Router } from "express"
import express from "express";
import dotenv from "dotenv";
import { userVerification } from "../Middlewares/AuthMiddleware.js";
import { FacultyuserVerification } from "../Middlewares/AuthMiddleware.js";
import { FacultySignup } from "../Controllers/AuthControllers.js";
import { UserModel } from "../Models/UserModel.js";
import { FacultyModel } from "../Models/FacultyUsers.js";
import multer from "multer";
import { DonePurchasedModel } from "../Models/DonePurchased.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import { ProductModel } from "../Models/Products.js";
dotenv.config()
const router = express.Router();

router.post("/signup", Signup);
router.post("/facultysignup", FacultySignup);
router.post("/login", Login);
router.post("/userspost", userVerification);
router.post("/facultypost", FacultyuserVerification);


import {v2 as cloudinary} from 'cloudinary';       
import { PurchasedModel } from "../Models/Purchased.js";
cloudinary.config({ 
  cloud_name: 'dxruxxfoa', 
  api_key: '559133875522998', 
  api_secret: 'RcXpXCPa6WJsTZmKxr8zN9Pzlwo' 
});
// Multer configuration for file upload
const cloudstorage = multer.memoryStorage();
const cloudupload = multer({ cloudstorage });

// Cloudinary configuration


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// Add Products //
router.post('/api/products', upload.array("image", 5), async (req, res) => {
 try {
  const { 
    sellerId,
    sellerName,
    stocks,
    sellerEmail,
    prodName,
    description,
    price,
    categories,
  marketType,
    accountType,
    facebook,
  } = req.body;
  const imageUrls = [];
  for(const file of req.files){
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }
  const newImages = new ProductModel({
    sellerId,
    sellerName,
    stocks,
    sellerEmail,
    prodName,
    description,
    price,
    categories,
    marketType,
    accountType,
    facebook,
    image: imageUrls,
  });
  await newImages.save();
 } catch (error) {
  console.log("Error uploading images", error);
  res.status(500).json({success: false, error: "Failed to upload"});
 }
});







router.get("/api/products", (req, res) => {
  ProductModel.find().then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(404).json(err);
  });
});
router.get("/api/inventory/:sellerId", (req, res) => {
  ProductModel.find({sellerId: req.params.sellerId}).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.get("/api/products/:id", (req, res) => {
  ProductModel.findById(req.params.id, req.body, req.file).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log("Error");
  });
});

router.post("/api/comments/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  const newComment = {
    comment: req.body.comment,
    commenterName: req.body.commenterName,
    createdAt: new Date()
  };
  product.comments.push(newComment);
  await product.save();
  res.json(newComment);
});





router.delete("/api/commentDelete/:id", (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log("Error to delete", err);
  });
});
// Add Products //

router.post('/api/DonePurchased', upload.array("picture", 5), async (req, res) => {
 try {
  const { 
    userId,
    sellerId,
    sellerName,
    productId,
    sellerEmail,
    prodName,
    message,
    quantity,
    buyerName,
    buyerEmail,
    image,
    status,
    total,
    types,
    sellerFacebook,
    buyerFacebook,
    picture,
    price,
    accountType,
    tax,
  } = req.body;
  const imageUrls = [];
  for(const file of req.files){
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }
  const newImages = new DonePurchasedModel({
    userId,
    sellerId,
    sellerName,
    productId,
    sellerEmail,
    prodName,
    message,
    quantity,
    buyerName,
    buyerEmail,
    status,
    total,
    types,
    sellerFacebook,
    buyerFacebook,
    picture: imageUrls,
    price,
    accountType,
    image,
    tax,
  });
  await newImages.save();
 } catch (error) {
  console.log("Error uploading images", error);
  res.status(500).json({success: false, error: "Failed to upload"});
 }
});


// item purchased add to cart //
router.post("/api/chats/:id", async (req, res) => {
  const chatsvar = await PurchasedModel.findById(req.params.id);
  const newChat = {
    chats: req.body.chats,
    chats2: req.body.chats2,
    senderName: req.body.senderName,
     senderName2: req.body.senderName2,
    createdAt: new Date()
  };
  chatsvar.chat.push(newChat);
  await chatsvar.save();
  res.json(newChat);
});

router.post("/api/purchasedItem", (req,res) => {
  PurchasedModel.create(req.body).then((result) => {
    res.json(result)
  }).catch((err) => {
    console.log("error", err)
  });
});
router.put("/api/purchasedItem/:id", upload.single('image'), (req, res) => {
  PurchasedModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(400).json({error: "Unable to update"});
  });
});
router.get("/api/transactions/:sellerId", (req, res) => {
  PurchasedModel.find({sellerId: req.params.sellerId}).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(404).json(err);
  });
});
router.get("/api/orders/:userId", (req, res) => {
  PurchasedModel.find({ userId: req.params.userId}).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log("Error to get orders", err);
  });
});
router.delete("/api/orders/:id", (req, res) => {
  PurchasedModel.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log("Error to delete", err);
  });
});
// item purchased add to cart //




// Users model //
router.get("/api/users", (req, res) => {
    UserModel.find()
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.status(404).json(err);
    });
});
router.put("/api/usersSellerUpdate/:id", (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body).then((result) => {
      res.json("Student user has been a seller successfully,");
  }).catch((err) => {
    console.log("Cannot be a seller.");
  });
});
router.delete("/api/users/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, req.body).then((result) => {
    res.json({mgs: "User Deleted"});
  }).catch((err) => {
    console.log("Error to delete this user", err);
  });
});
router.get("/api/users/:id", (req, res) => {
  UserModel.findById(req.params.id, req.body, req.file).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log("Error");
  });
});

router.put('/api/users/:id', upload.fields([
  { name: 'validId', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'shopImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { email, username, fullname, address, gender, department, facebook, course, phoneNumber, shopDescription, gcashNumber, isSeller } = req.body;
    const { image, validId, shopImage } = req.files;

    // Function to upload a single image to Cloudinary
    const uploadToCloudinary = async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url; // Get the secure URL of the uploaded image
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
      }
    };

    // Upload images to Cloudinary
    const imageUrl = image ? await uploadToCloudinary(image[0]) : null;
    const validIdUrl = validId ? await uploadToCloudinary(validId[0]) : null;
    const shopImageUrl = shopImage ? await uploadToCloudinary(shopImage[0]) : null;

    // Update user data with Cloudinary URLs
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
      email, username, fullname, address, gender, department, facebook, course, phoneNumber, shopDescription, gcashNumber, isSeller,
      image: imageUrl, validId: validIdUrl, shopImage: shopImageUrl
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ msg: "User data updated successfully", user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: "Cannot update user data" });
  }
});


// Users model //


// Faculty users model //
router.get("/api/faculty",(req, res) => {
    FacultyModel.find()
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.status(404).json(err);
    });
});



router.put("/api/facultySellerUpdate/:id", (req, res) => {
  FacultyModel.findByIdAndUpdate(req.params.id, req.body).then((result) => {
      res.json("Faculty member has been a seller successfully,");
  }).catch((err) => {
    console.log("Cannot be a seller.");
  });
});
router.get("/api/faculty/:id", (req, res) => {
  FacultyModel.findById(req.params.id, req.body).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log("Error");
  });
});
router.delete("/api/faculty/:id", (req, res) => {
  FacultyModel.findByIdAndDelete(req.params.id, req.body).then((result) => {
    res.json({mgs: "Faculty user deleted"});
  }).catch((err) => {
    console.log("Error to delete faculty user", err);
  });
});




router.put("/api/faculty/:id", upload.fields([
  { name: 'validId', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'shopImage', maxCount: 1 }
]), async (req, res) => {
  try {
      const { email, username, fullname, address, gender,  facebook,  phoneNumber, shopDescription, gcashNumber, isSeller } = req.body;
  const { image, validId, shopImage } = req.files;
 // Function to upload a single image to Cloudinary
    const uploadToCloudinary = async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url; // Get the secure URL of the uploaded image
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
      }
    };

    // Upload images to Cloudinary
    const imageUrl = image ? await uploadToCloudinary(image[0]) : null;
    const validIdUrl = validId ? await uploadToCloudinary(validId[0]) : null;
    const shopImageUrl = shopImage ? await uploadToCloudinary(shopImage[0]) : null;

    // Update user data with Cloudinary URLs
    const updatedUser = await FacultyModel.findByIdAndUpdate(req.params.id, {
      email, username, fullname, address, gender, facebook, phoneNumber, shopDescription, gcashNumber, isSeller,
      image: imageUrl, validId: validIdUrl, shopImage: shopImageUrl
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ msg: "User data updated successfully", user: updatedUser });
    
  } catch (error) {
     console.error('Error updating user:', error);
    res.status(400).json({ message: "Cannot update user data" });
  }
});



// Faculty users Model //


export default router;
