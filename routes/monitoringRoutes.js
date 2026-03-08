const express = require("express");
const router = express.Router();

const { getSystemMonitoring } = require("../controllers/monitoringController");

router.get("/system", getSystemMonitoring);

module.exports = router;