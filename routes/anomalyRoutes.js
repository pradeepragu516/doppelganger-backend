const express = require("express");
const router = express.Router();

const {
  getAllAnomalies,
  createAnomaly
} = require("../controllers/anomalyController");

router.get("/", getAllAnomalies);
router.post("/add", createAnomaly);

module.exports = router;