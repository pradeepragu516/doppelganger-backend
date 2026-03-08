const os = require("os");

exports.getSystemStats = () => {

  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  return {
    cpuLoad: os.loadavg()[0],
    totalMemory,
    freeMemory,
    usedMemory: totalMemory - freeMemory,
    uptime: os.uptime()
  };
};