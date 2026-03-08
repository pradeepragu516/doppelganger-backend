const SensorData = require("../models/SensorData");
const Anomaly = require("../models/Anomaly");
const MaintenanceRequest = require("../models/maintenanceRequest");

exports.getDashboardStats = async (req, res) => {
  try {

    const totalSensors = await SensorData.countDocuments();
    const totalAnomalies = await Anomaly.countDocuments();
    const totalRequests = await MaintenanceRequest.countDocuments();

    res.json({
      totalSensorRecords: totalSensors,
      totalAnomalies,
      totalMaintenanceRequests: totalRequests
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSensorTrends = async (req, res) => {
  try {

    const trends = await SensorData.find()
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(trends);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAnomalyStats = async (req, res) => {
  try {

    const stats = await Anomaly.aggregate([
      {
        $group: {
          _id: "$severity",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};