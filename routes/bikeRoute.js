const express = require("express");
const router = express.Router();
const BikeModel = require("../models/bikes");
const path = require("path");
router.get("/bikeDetail/:bikeId", (req, res) => {
  console.log(req.params);
  res.status(200).sendFile(path.resolve("./public/bike-detail.html"));
});

router.get("/bikeD/:bikeId", async (req, res) => {
  console.log(req.params.bikeId);
  try {
    const Bike = await BikeModel.findById(req.params.bikeId);
    res.status(200).send(Bike);
  } catch (error) {
    res.status(400).send({ message: "Failed" });
  }
  //   console.log(Bike);
});

module.exports = router;
