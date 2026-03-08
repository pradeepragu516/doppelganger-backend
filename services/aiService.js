const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

exports.detectAnomaly = async (sensorData) => {
  try {

    const response = await axios.post(
      `${ML_SERVICE_URL}/predict`,
      sensorData,
      { timeout: 5000 }
    );

    return response.data;

  } catch (err) {

    console.error("aiService.detectAnomaly error:", err.message);
    throw err;

  }
};