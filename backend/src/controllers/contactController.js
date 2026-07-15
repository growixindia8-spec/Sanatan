const ContactMessage = require('../models/ContactMessage');
const { sendEmail } = require('../utils/sendEmail');

exports.submitContact = async (req, res, next) => {
  const { fullName, email, mobile, subject, message } = req.body;

  if (!fullName || !email || !mobile || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please specify all required fields' });
  }

  try {
    await ContactMessage.create({
      fullName,
      email,
      mobile,
      subject,
      message
    });

    // Notify Admin via email
    sendEmail({
      to: process.env.SMTP_USER,
      subject: `📩 NEW CONTACT MESSAGE - ${subject}`,
      text: `Contact Message from ${fullName} (${mobile}). Message: ${message}`,
      html: `<h3>New Contact Message</h3><p>From: <strong>${fullName}</strong> (${email})</p><p>Subject: ${subject}</p><p>${message}</p>`
    }).catch(emailErr => {
      console.error('Failed to send admin notification email:', emailErr.message);
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (err) {
    next(err);
  }
};
