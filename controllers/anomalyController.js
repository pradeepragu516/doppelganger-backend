const Anomaly = require("../models/Anomaly");

exports.getAllAnomalies = async (req, res) => {
  try {
    const anomalies = await Anomaly.find()
      .populate("machineId")
      .populate("sensorDataId");

    res.json(anomalies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAnomaly = async (req, res) => {
  try {
    const { machineId, sensorDataId, temperature, pressure, vibration, severity } = req.body;

    const anomaly = new Anomaly({
      machineId,
      sensorDataId,
      temperature,
      pressure,
      vibration,
      severity
    });

    await anomaly.save();

    res.status(201).json({
      message: "Anomaly recorded successfully",
      anomaly
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};