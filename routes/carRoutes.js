const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const CarModel = require("../models/cars");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve("./public/cars.html"));
});
router.get("/allCars", async (req, res) => {
  try {
    const allCars = await CarModel.find({});
    res.status(200).send({ message: "success", data: allCars });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Get All Cars Error Occured", error: error.message });
  }
});

// router.post("/addCar", upload.single("file"), (req, res) => {
router.post("/addCar", async (req, res) => {
  console.log("aar");
  try {
    const newCar = new CarModel({
      Name: "Faizan",
      Description: "adsfas",
      Price: 500,
      Seats: 5,
    });
    await newCar.save();

    return res
      .status(200)
      .send({ message: "Car has been added", data: newCar });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Car adding Failed", error: error.message });
  }
});

router.get("/carDetail/:carId", (req, res) => {
  console.log(req.params);
  res.status(200).sendFile(path.resolve("./public/car-detail.html"));
});

router.get("/carD/:carId", async (req, res) => {
  console.log(req.params.carId);
  const Car = await CarModel.findById(req.params.carId);
  // console.log(Car);
  res.status(200).send(Car);
});
module.exports = router;
