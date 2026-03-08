const { getSystemStats } = require("../monitoring/systemMonitor");

exports.getSystemMonitoring = (req, res) => {
  try {

    const stats = getSystemStats();

    res.json({
      message: "System monitoring data",
      stats
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};