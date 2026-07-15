const CsrEnquiry = require('../models/CsrEnquiry');
const { sendEmail } = require('../utils/sendEmail');

exports.submitCsrEnquiry = async (req, res, next) => {
  try {
    const enquiry = await CsrEnquiry.create(req.body);

    // Notify Administrator (Non-blocking)
    sendEmail({
      to: process.env.SMTP_USER,
      subject: `🏢 NEW CSR ENQUIRY RECEIVED - ${req.body.organizationName}`,
      text: `Hello Admin, a new CSR enquiry has been received from ${req.body.contactPersonName} representing ${req.body.organizationName}. Interested: ${req.body.interestedInCollaboration}.`,
      html: `<h3>New CSR Partnership Enquiry</h3><p>Organization: <strong>${req.body.organizationName}</strong></p><p>Contact: ${req.body.contactPersonName} (${req.body.mobileNumber})</p><p>Check details inside Admin Panel.</p>`
    }).catch(err => console.error("CSR Email Notification Failed:", err.message));

    return res.status(200).json({
      success: true,
      message: 'CSR enquiry submitted successfully'
    });

  } catch (err) {
    next(err);
  }
};
