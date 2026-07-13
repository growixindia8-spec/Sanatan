const Newsletter = require('../models/Newsletter');
const { sendEmail } = require('../utils/sendEmail');

exports.subscribeNewsletter = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please specify your email address' });
  }

  try {
    // Duplicate check
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'This email is already subscribed' });
    }

    await Newsletter.create({ email });

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: '🚩 Welcome to Sanatan Dharm Foundation Newsletter',
      text: 'Thank you for subscribing to our newsletter updates. Stay tuned for seva details.',
      html: '<h3>Welcome to our newsletter!</h3><p>Thank you for subscribing. We will keep you updated with our seva drives, festivals, and key social events.</p><p>Regards,<br/>Sanatan Dharm Manav Kalyan Foundation</p>'
    });

    return res.status(200).json({ success: true, message: 'Subscribed successfully' });

  } catch (err) {
    next(err);
  }
};
