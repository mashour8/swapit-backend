const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sizeSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Size = model("Size", sizeSchema);
module.exports = Size;
