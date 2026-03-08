const mongoose = require("mongoose");

const SupportRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open"
  },
  reportedByName: {
    type: String
  },
  reportedByEmail: {
    type: String
  },
  machineId: {
    type: String
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SupportRequest", SupportRequestSchema);