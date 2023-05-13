const mongoose = require("mongoose");

const BikesSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Price: Number,
  Type: String,
  Model: String,
  images: Array,
});

module.exports = mongoose.model("bikes", BikesSchema);
