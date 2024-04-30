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
    isNew,
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
    isNew,
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
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/products/:prodcutId -  Retrieves a specific product by id
router.get("/prodcuts/:prodcutId", (req, res, next) => {
  const { prodcutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(prodcutId)) {
    res.status(400).json({ message: "prodcut id is not valid" });
    return;
  }
  Product.findById(prodcutId)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// PUT  /api/products/:prodcutId  -  Updates a specific prodcut by id
router.put("/prodcuts/:prodcutId", (req, res, next) => {
  const { prodcutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "prodcut id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(prodcutId, req.body, { new: true })
    .then((prodcut) => {
      res.status(200).json(prodcut);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// DELETE  /api/products/:productId  -  Deletes a specific product by id
router.delete("/prodcuts/:prodcutId", (req, res, next) => {
  const { prodcutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "prodcut id is not valid" });
    return;
  }
  Product.findOneAndDelete(prodcutId).then(() => {
    res
      .json({
        message: `prodcut with ${prodcutId} is removed successfully.`,
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  });
});

module.exports = router;
