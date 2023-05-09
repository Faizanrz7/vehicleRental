const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send({ message: "All Set" });
  } catch (error) {
    res.status(400).send({ message: "Error Occured", error: error.message });
  }
});

module.exports = router;
