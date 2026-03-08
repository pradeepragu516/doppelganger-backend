const express = require("express");
const router = express.Router();

const {
  createSupportRequest,
  getAllSupportRequests,
  updateSupportStatus
} = require("../controllers/supportController");

router.post("/create", createSupportRequest);
router.get("/", getAllSupportRequests);
router.put("/:id", updateSupportStatus);

module.exports = router;