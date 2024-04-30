const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addressSchema = new Schema({
  city: {
    type: String,
    require: true,
    unique: true,
  },
  zip: {
    type: Number,
    require: true,
  },
  street: {
    type: String,
  },
  houseNumber: {
    type: Number,
    require: true,
  },
  contry: {
    type: String,
  },
});

const Address = model("Address", addressSchema);

module.exports = Address;
