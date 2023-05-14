const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  Name: String,
  Address: {
    Street: String,
    StreetNumber: String,
    PostCode: String,
    City: String,
    Country: String,
  },
  Mobile: Number,
  Aadhar: String,
  Pan: String,
});

UserSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
});

module.exports = mongoose.model("user", UserSchema);
