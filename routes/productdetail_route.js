const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const protectedRoute = require("../middleware/protectedResource");
const ProductModel = require("../models/product_model");
const UserModel = require("../models/user_model");
const SellerModel = require("../models/seller_model");



router.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  ProductModel.findById(productId)
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
      model: UserModel,
    })
    .populate("author", "_id FullName ProfileImg")
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ product: product });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
