const mongoose = require("mongoose");

const MaintenanceRequestSchema = new mongoose.Schema({
  // store machine identifier (string) to match Machine.id in DB
  machineId: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);