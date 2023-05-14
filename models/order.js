const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { Types } = mongoose;

const OrderSchema = new mongoose.Schema({
  vehicleId: { type: Types.ObjectId, ref: "cars", ref: "bikes" },
  userId: { type: Types.ObjectId, ref: "user" },
  razorPayId: String,
  cost: Number,
  Status: String,
});

module.exports = mongoose.model("orders", OrderSchema);
