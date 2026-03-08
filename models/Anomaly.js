const mongoose = require("mongoose");

const AnomalySchema = new mongoose.Schema({
  machineId: {
    // store machine identifier string (Machine.id)
    type: String,
    required: true
  },
  sensorDataId: {
    // reference sensor data by id string if provided
    type: String,
    ref: "SensorData"
  },
  temperature: Number,
  pressure: Number,
  vibration: Number,
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  detectedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Anomaly", AnomalySchema);