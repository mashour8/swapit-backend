const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order.model");

//  POST /api/categories  -  Draft Cart a new category
router.post("/orders", (req, res, next) => {
  
  const {
    userId,
    products,
    orderDate,
    orderStatus,
    shippingAddress,
    totalAmount,
    isActive,
  } = req.body;

  Order.create({
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
router.get("/orders", (req, res, next) => {
  Order.find()
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
router.get("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "cart id is not valid" });
    return;
  }
  Order.findById(orderId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// PUT  /api/draft/:categoryId  -  Updates a specific category by id
router.put("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "cart id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// DELETE  /api/draft/:draftId  -  Deletes a specific cart by id
// 663e865c2528793cf8ce424f

router.delete("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ message: "order id is not valid" });
    return;
  }
  Order.findByIdAndDelete(orderId)
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
