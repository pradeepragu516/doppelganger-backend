const SupportRequest = require("../models/SupportRequest");
const { generateRequest } = require("../utils/requestGenerator");

exports.createSupportRequest = async (req, res) => {
  try {
    const { userId, subject, message, machineId, priority, reportedById, reportedByEmail, reportedByName } = req.body;

    console.log('Create support request payload:', req.body);

    const request = new SupportRequest({
      userId: userId || (reportedById || null),
      subject,
      message,
      reportedByName: reportedByName || null,
      reportedByEmail: reportedByEmail || null,
      machineId: machineId || null,
      priority: priority || 'Medium'
    });

    await request.save();

    // If machine info provided, generate a maintenance request
    if (request.machineId) {
      try {
        // use support priority to set maintenance severity when provided
        const severity = request.priority || 'High';
        await generateRequest(request.machineId, subject || message || 'Support reported issue', severity);
      } catch (e) {
        // log but don't fail support creation
        console.warn('Failed to generate maintenance request from support:', e.message || e);
      }
    }

    res.status(201).json({
      message: "Support request submitted",
      request
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSupportRequests = async (req, res) => {
  try {
    const requests = await SupportRequest.find().populate("userId");

    res.json(requests);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSupportStatus = async (req, res) => {
  try {

    const request = await SupportRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(request);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};