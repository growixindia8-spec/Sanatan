const transporter = require('../config/email');

async function sendEmail({ to, subject, text, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[EMAIL MOCK] To: ${to}, Subject: ${subject}`);
    return { success: true, message: 'SMTP credentials missing, operating in mock mode' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Sanatan Dharm Foundation" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    });
    return info;
  } catch (error) {
    console.error('Email dispatch error:', error.message);
    throw new Error('Failed to dispatch automated email notification');
  }
}

module.exports = { sendEmail };
