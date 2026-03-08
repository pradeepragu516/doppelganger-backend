const MaintenanceRequest = require("../models/maintenanceRequest");
const User = require("../models/User");

exports.generateRequest = async (machineId, issue, severity = 'High') => {
  // normalize severity to TitleCase expected by schema
  const sev = (typeof severity === 'string') ? (severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase()) : 'High';
  // avoid creating duplicate open requests for the same machine
  const existing = await MaintenanceRequest.findOne({
    machineId,
    status: { $in: ['Pending', 'In Progress'] }
  });
  if (existing) {
    // if an open request exists but has no assignee, try to assign one
    if (!existing.assignedTo) {
      try {
        const techs = await User.find({ role: 'maintenance' }).limit(20);
        if (Array.isArray(techs) && techs.length) {
          const assigned = techs[Math.floor(Math.random() * techs.length)];
          existing.assignedTo = assigned._id;
          await existing.save();
        }
      } catch (e) {
        // ignore assignment errors
      }
    }
    return existing;
  }

  // try to assign a maintenance user if available
  let assigned = null;
  try {
    const techs = await User.find({ role: 'maintenance' }).limit(20);
    if (Array.isArray(techs) && techs.length) {
      assigned = techs[Math.floor(Math.random() * techs.length)];
    }
  } catch (e) {
    // ignore user lookup errors and leave unassigned
  }

  const requestData = {
    machineId,
    issue,
    severity: sev
  };
  if (assigned) requestData.assignedTo = assigned._id;

  const request = new MaintenanceRequest(requestData);

  await request.save();
  return request;
};