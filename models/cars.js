const mongoose = require("mongoose");

const CarsSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Price: Number,
  Seats: Number,
  images: [
    {
      link: String,
    },
  ],
});

module.exports = mongoose.model("cars", CarsSchema);
