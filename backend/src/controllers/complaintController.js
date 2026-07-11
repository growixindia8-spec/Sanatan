const Complaint = require('../models/Complaint');
const { sendEmail } = require('../utils/sendEmail');

exports.submitComplaint = async (req, res, next) => {
  const { fullName, mobile, email, category, description, dateOfIncident } = req.body;

  if (!fullName || !mobile || !email || !category || !description) {
    return res.status(400).json({ success: false, message: 'Please specify all required complaint parameters' });
  }

  try {
    const evidenceUrl = req.file ? req.file.path : null;

    // Generate ticket ID
    const count = await Complaint.countDocuments();
    const ticketId = `CMP-${String(count + 1).padStart(6, '0')}`;

    const complaint = await Complaint.create({
      ticketId,
      fullName,
      mobile,
      email,
      category,
      description,
      dateOfIncident: dateOfIncident ? new Date(dateOfIncident) : null,
      evidenceUrl
    });

    // Email notification to user
    await sendEmail({
      to: email,
      subject: `⚖️ SDMKF Complaint Lodged - Ticket ID: ${ticketId}`,
      text: `Dear ${fullName}, your complaint regarding category '${category}' has been successfully registered. Ticket: ${ticketId}.`,
      html: `<h3>Dear ${fullName},</h3><p>Your complaint has been successfully registered with Ticket: <strong>${ticketId}</strong>.</p><p>We will review the details and get back to you shortly.</p>`
    });

    return res.status(200).json({
      success: true,
      message: 'Grievance ticket registered successfully',
      ticketId
    });

  } catch (err) {
    next(err);
  }
};
