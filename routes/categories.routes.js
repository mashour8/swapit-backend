const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category.model");

//  POST /api/categories  -  Creates a new category
router.post("/categories", (req, res, next) => {
  const { name } = req.body;
  Category.create({
    name,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/categories -  Retrieves all of the categories
router.get("/categories", (req, res, next) => {
  Category.find()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/categories/:categoryId -  Retrieves a specific category by id
router.get("/categories/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400).json({ message: "category id is not valid" });
    return;
  }
  Category.findById(categoryId)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// PUT  /api/categories/:categoryId  -  Updates a specific category by id
router.put("/categories/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "category id is not valid" });
    return;
  }
  
  Category.findByIdAndUpdate(categoryId, req.body, { new: true })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// DELETE  /api/categories/:categoryId  -  Deletes a specific category by id
router.delete("/categories/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "category id is not valid" });
    return;
  }
  Category.findOneAndDelete(categoryId).then(() => {
    res
      .json({
        message: `category with ${categoryId} is removed successfully.`,
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  });
});

module.exports = router;
