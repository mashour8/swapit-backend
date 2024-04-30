const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Size = require("../models/Size.model");

//  POST /api/sizes  -  Creates a new Size
router.post("/sizes", (req, res, next) => {
  const { name } = req.body;
  Size.create({
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

//  GET /api/sizes -  Retrieves all of the sizes
router.get("/sizes", (req, res, next) => {
  Size.find()
    .then((size) => {
      res.json(size);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/sizes/:SizeId -  Retrieves a specific Size by id
router.get("/sizes/:sizeId", (req, res, next) => {
  const { sizeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(sizeId)) {
    res.status(400).json({ message: "Size id is not valid" });
    return;
  }
  Size.findById(sizeId)
    .then((size) => {
      res.status(200).json(size);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// PUT  /api/sizes/:sizeId  -  Updates a specific Size by id
router.put("/sizes/:sizeId", (req, res, next) => {
  const { sizeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "Size id is not valid" });
    return;
  }

  Size.findByIdAndUpdate(sizeId, req.body, { new: true })
    .then((size) => {
      res.status(200).json(size);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// DELETE  /api/sizes/:SizeId  -  Deletes a specific Size by id
router.delete("/sizes/:sizeId", (req, res, next) => {
  const { sizeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "Size id is not valid" });
    return;
  }
  Size.findOneAndDelete(sizeId).then(() => {
    res
      .json({
        message: `Size with ${sizeId} is removed successfully.`,
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  });
});

module.exports = router;
