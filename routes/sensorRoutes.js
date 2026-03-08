const express = require("express");
const router = express.Router();
const { addSensorData } = require("../controllers/sensorController");

router.post("/add", addSensorData);

module.exports = router;