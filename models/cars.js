const mongoose = require("mongoose");

const CarsSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Price: Number,
  Seats: Number,
  images: Array,
});

module.exports = mongoose.model("cars", CarsSchema);
