const SensorData = require("../models/SensorData");
const { generateRequest } = require("../utils/requestGenerator");

exports.addSensorData = async (req, res) => {
  try {
    const { machineId, temperature, pressure, vibration } = req.body;

    const data = new SensorData({
      machineId,
      temperature,
      pressure,
      vibration
    });

    await data.save();

    // Basic anomaly rule (until ML integrated)
    if (temperature > 90 || pressure > 120 || vibration > 80) {
      await generateRequest(machineId, "Possible anomaly detected");
    }

    res.status(201).json({
      message: "Sensor data stored successfully",
      data
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};