const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected Successfull");
  } catch (error) {
    console.log("DB error");
  }
};

module.exports = dbConnect;
