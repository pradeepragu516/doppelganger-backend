const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role ? role.toLowerCase() : undefined
    });

    const userObj = user.toObject();
    delete userObj.password;
    res.json(userObj);

  } catch (err) {
    console.error("Register error:", err);
    if (err && err.code === 11000) {
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).json("Invalid password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });

};