const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  Mobile: Number,
});

UserSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
});

module.exports = mongoose.model("user", UserSchema);
