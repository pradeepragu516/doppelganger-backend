const express = require("express");
const router = express.Router();
const {
  getAllRequests,
  updateRequestStatus
} = require("../controllers/requestController");

router.get("/", getAllRequests);
router.put("/:id", updateRequestStatus);

module.exports = router;