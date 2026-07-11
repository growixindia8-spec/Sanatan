const axios = require('axios');

async function sendSmsOtp(mobile, otp) {
  if (!process.env.FAST2SMS_API_KEY) {
    console.log(`[FAST2SMS MOCK] Mobile: ${mobile}, OTP Code: ${otp}`);
    return { return: true, message: 'Fast2SMS API Key missing, operating in mock mode' };
  }

  try {
    const res = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'otp',
      variables_values: otp,
      numbers: mobile,
    }, {
      headers: { authorization: process.env.FAST2SMS_API_KEY }
    });
    return res.data;
  } catch (error) {
    console.error('Fast2SMS error:', error.message);
    throw new Error('Failed to dispatch SMS verification OTP');
  }
}

module.exports = { sendSmsOtp };
