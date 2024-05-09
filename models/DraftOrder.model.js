const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const draftOrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      size: String,
      quantity: Number,
      totalPrice: Number,
    },
  ],
  orderDate: { type: Date, default: Date.now() },
  orderStatus: String,
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

const DraftOrder = model("DraftOrder", draftOrderSchema);
module.exports = DraftOrder;
