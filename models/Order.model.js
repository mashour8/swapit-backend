const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      totalPrice: Number,
    },
  ],
  orderDate: Date,
  status: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  totalAmount: Number,

  isActive: {
    type: Boolean,
    default: true,
  },
});

const Order = model("Order", orderSchema);
module.exports = Order;
