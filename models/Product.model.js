const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  images: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  sizes: [
    {
      name: {
        type: String,
        require: true,
      },
      inStock: { type: Boolean, default: false },
    },
  ],

  // sizes: {
  //   type: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Size",
  //     },
  //   ],
  // },
  description: String,

  isNewProduct: {
    type: Boolean,
    default: false,
  },
  isSeason: {
    type: Boolean,
    default: false,
  },
  isEssential: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
