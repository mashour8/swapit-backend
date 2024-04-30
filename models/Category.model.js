const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

const Category = model("Category", categorySchema);
module.exports = Category;
