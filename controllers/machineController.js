const Machine = require("../models/Machine");

const calculateHealth = (temperature, pressure, vibration) => {
  const tempScore = Math.max(0, 100 - Math.abs(temperature - 65) * 2);
  const pressScore = Math.max(0, 100 - Math.abs(pressure - 90) * 1.5);
  const vibScore = Math.max(0, 100 - Math.abs(vibration - 3) * 10);
  return Math.round((tempScore + pressScore + vibScore) / 3);
};

exports.createMachine = async (req, res) => {
  try {
    const { id, location, temperature, pressure, vibration, name } = req.body;
    if (!id) return res.status(400).json({ error: 'Machine id is required' });

    const temp = parseFloat(temperature) || 65;
    const press = parseFloat(pressure) || 90;
    const vib = parseFloat(vibration) || 3;

    const healthScore = calculateHealth(temp, press, vib);
    const status = healthScore >= 80 ? 'Normal' : (healthScore >= 60 ? 'Warning' : 'Critical');

    const payload = {
      id,
      name,
      location,
      temperature: temp,
      pressure: press,
      vibration: vib,
      healthScore,
      status,
      logs: req.body.logs || [],
      history: req.body.history || {},
      addedAt: req.body.addedAt || Date.now()
    };

    const machine = await Machine.create(payload);
    res.json(machine);
  } catch (err) {
    console.error('Create machine error:', err);
    if (err && err.code === 11000) return res.status(400).json({ error: 'Machine id already exists' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (err) {
    console.error('Get machines error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};