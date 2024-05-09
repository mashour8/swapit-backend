const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DraftOrder = require("../models/DraftOrder.model");

//  POST /api/categories  -  Draft Cart a new category
router.post("/draft", (req, res, next) => {
  const {
    userId,
    products,
    orderDate,
    orderStatus,
    shippingAddress,
    totalAmount,
    isActive,
  } = req.body;

  DraftOrder.create({
    userId,
    products,
    orderDate,
    orderStatus,
    shippingAddress,
    totalAmount,
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

//  GET /api/draft -  Retrieves all of the draft
router.get("/draft", (req, res, next) => {
  DraftOrder.find()
    .then((response) => {
      //   const limit = parseInt(req.query.limit);
      //   const offset = parseInt(req.query.offset);

      //   const categories = response.slice(offset, offset + limit);
      //   const totalCount = response.length;
      //   res.header("Access-Control-Allow-Origin", "*");
      //   res.json({ categories, totalCount });
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/draft/:draftId -  Retrieves a specific draft by id
router.get("/draft/:draftId", (req, res, next) => {
  const { draftId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(draftId)) {
    res.status(400).json({ message: "cart id is not valid" });
    return;
  }
  DraftOrder.findById(draftId)
    .then((draft) => {
      res.status(200).json(draft);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// PUT  /api/draft/:categoryId  -  Updates a specific category by id
router.put("/draft/:draftId", (req, res, next) => {
  const { draftId } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "cart id is not valid" });
    return;
  }

  DraftOrder.findByIdAndUpdate(draftId, req.body, { new: true })
    .then((draft) => {
      res.status(200).json(draft);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// DELETE  /api/draft/:draftId  -  Deletes a specific cart by id

router.delete("/draft/:draftId", (req, res, next) => {
  const { draftId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "cart id is not valid" });
    return;
  }
  DraftOrder.findByIdAndDelete(draftId)
    .then((response) => {
      res.json({
        message: `${response.name}`,
      });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

module.exports = router;
