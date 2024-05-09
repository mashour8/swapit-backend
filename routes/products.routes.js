const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.model");

const fileUploader = require("../config/cloudinary.config");

//upload a picture
router.post("/upload", fileUploader.array("imageUrl"), (req, res, next) => {
  // console.log"file is: ", req.file)

  if (!req.files) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  let imagURL = [];
  req.files.map((fileURL) => {
    imagURL.push(fileURL.path);
  });
  res.json(imagURL);
});

//  POST /api/products  -  Creates a new product
router.post("/products", (req, res, next) => {
  const {
    name,
    price,
    images,
    category,
    sizes,
    description,
    isNewProduct,
    isSeason,
    isActive,
  } = req.body;
  Product.create({
    name,
    price,
    images: images,
    category,
    sizes: sizes,
    description,
    isNewProduct,
    isSeason,
    isActive,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/products -  Retrieves all of the products
router.get("/products", (req, res, next) => {
  Product.find()
    .populate("category")
    .then((response) => {
      const limit = parseInt(req.query.limit);
      const offset = parseInt(req.query.offset);
      // res.json(response);
      const products = response.slice(offset, offset + limit);
      const totalCount = response.length;

      res.header("Access-Control-Allow-Origin", "*");
      res.json({ products, totalCount });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/products/:productId -  Retrieves a specific product by id
router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "product id is not valid" });
    return;
  }
  Product.findById(productId)
    .populate("category")
    .populate("sizes")
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// PUT  /api/products/:productId  -  Updates a specific product by id
router.put("/products/:productId", (req, res, next) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "product id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(productId, req.body, { new: true })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// DELETE  /api/products/:productId  -  Deletes a specific product by id
router.delete("/products/:productId", (req, res, next) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "product id is not valid" });
    return;
  }
  Product.findByIdAndDelete(productId)
    .then((response) => {
      res.json({
        // message: `product with ${response.name} is removed successfully.`,
        message: `${response.name}`,
      });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

module.exports = router;
