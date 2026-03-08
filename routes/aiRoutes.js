const express = require('express');
const router = express.Router();
const { detect } = require('../controllers/aiController');

router.post('/predict', detect);

module.exports = router;
