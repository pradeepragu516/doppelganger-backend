const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getSensorTrends,
  getAnomalyStats
} = require("../controllers/analyticsController");

router.get("/dashboard", getDashboardStats);
router.get("/sensor-trends", getSensorTrends);
router.get("/anomaly-stats", getAnomalyStats);

module.exports = router;