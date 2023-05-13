const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const OrderSchema = new mongoose.Schema({
  vehicleId: ObjectId,
  userID: ObjectId,
  cost: Number,
});

module.exports = mongoose.model("orders", OrderSchema);
