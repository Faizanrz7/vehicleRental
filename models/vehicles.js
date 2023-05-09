const mongoose = require("mongoose");

const VehicleScheme = new mongoose.Schema({
  Name: {
    type: String,
    requied: true,
  },
  Description: {
    type: String,
  },
  Type: {
    type: String,
  },
  Images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model("vehicles", VehicleScheme);
