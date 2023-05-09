const mongoose = require("mongoose");

const BusesSchema = mongoose.Schema({
  Name: String,
  Description: String,
  price: Number,
  seats: Number,
});

module.exports = mongoose.model("buses", BusesSchema);
