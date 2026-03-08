const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  location: String,
  temperature: { type: Number, default: 65 },
  pressure: { type: Number, default: 90 },
  vibration: { type: Number, default: 3 },
  status: { type: String, default: "Normal" },
  healthScore: { type: Number, default: 100 },
  logs: { type: Array, default: [] },
  history: { type: Object, default: {} },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Machine", MachineSchema);