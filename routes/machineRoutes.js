const express = require("express");
const router = express.Router();
const { createMachine, getMachines } = require("../controllers/machineController");

router.post("/", createMachine);
router.get("/", getMachines);

module.exports = router;