const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const machineRoutes = require("./routes/machineRoutes");
const aiRoutes = require("./routes/aiRoutes");
const userRoutes = require("./routes/userRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const supportRoutes = require("./routes/supportRoutes");
const anomalyRoutes = require("./routes/anomalyRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const monitoringRoutes = require("./routes/monitoringRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/anomalies", anomalyRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/monitoring", monitoringRoutes);

module.exports = app;