const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/predict';

exports.detectAnomaly = async (sensorData) => {
  try {
    const response = await axios.post(ML_SERVICE_URL, sensorData, { timeout: 5000 });
    return response.data;
  } catch (err) {
    console.error('aiService.detectAnomaly error:', err.message || err);
    throw err;
  }
};
