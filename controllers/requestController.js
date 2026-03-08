const MaintenanceRequest = require("../models/maintenanceRequest");

exports.getAllRequests = async (req, res) => {
  try {
    // machineId now stores machine identifier string (Machine.id), so only populate assignedTo
    const requests = await MaintenanceRequest.find()
      .populate("assignedTo", "-password");

    res.json(requests.map(r => ({
      id: r._id,
      machine: r.machineId,
      issue: r.issue,
      severity: r.severity,
      status: r.status,
      // provide both object and convenience fields for clients
      assignedTo: r.assignedTo ? { id: String(r.assignedTo._id), name: r.assignedTo.name, email: r.assignedTo.email } : null,
      assignedToId: r.assignedTo ? String(r.assignedTo._id) : (r.assignedToId || null),
      assignedToName: r.assignedTo ? r.assignedTo.name : (r.assignedToName || null),
      createdAt: r.createdAt
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    // accept TitleCase statuses from client but ensure we store allowed enum
    const allowed = ["Pending", "In Progress", "Resolved"];
    const status = req.body.status && allowed.includes(req.body.status) ? req.body.status : undefined;

    // support assigning a technician: assignedTo (ObjectId)
    const assignedToId = req.body.assignedToId || req.body.assignedTo || null;

    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (assignedToId) updatePayload.assignedTo = assignedToId;

    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      { $set: updatePayload },
      { new: true }
    );

    if (!request) return res.status(404).json({ error: 'Request not found' });

    res.json({ id: request._id, status: request.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};