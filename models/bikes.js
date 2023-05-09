const mongoose = require("mongoose");

const BikesSchema = mongoose.Schema({
  Name: String,
  Description: String,
  price: Number,
  Type: String,
});

module.exports = mongoose.model("bikes", BikesSchema);
