const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { Types } = mongoose;

const OrderSchema = new mongoose.Schema({
  vehicleId: { type: Types.ObjectId, ref: "cars" },
  userId: { type: Types.ObjectId, ref: "user" },
  cost: Number,
});

module.exports = mongoose.model("orders", OrderSchema);
