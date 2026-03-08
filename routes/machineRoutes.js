const express = require("express");
const router = express.Router();
const { createMachine, getMachines, deleteMachine } = require("../controllers/machineController");

router.post("/", createMachine);
router.get("/", getMachines);
router.delete("/:id", deleteMachine);

module.exports = router;