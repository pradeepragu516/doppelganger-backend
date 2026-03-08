const aiService = require('../services/aiService');

exports.detect = async (req, res) => {
  try {
    const sensorData = req.body;
    const result = await aiService.detectAnomaly(sensorData);
    res.json(result);
  } catch (err) {
    console.error('AI detect error:', err.message || err);
    res.status(500).json({ error: 'AI service error' });
  }
};
