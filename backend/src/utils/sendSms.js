const axios = require('axios');

async function sendSmsOtp(mobile, otp) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!process.env.FAST2SMS_API_KEY) {
    if (isProduction) {
      throw new Error('SMS service is not configured.');
    }
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

    if (res.data && res.data.return === true) {
      return res.data;
    } else {
      const errorMsg = res.data ? res.data.message : 'SMS request rejected by provider';
      throw new Error(typeof errorMsg === 'string' ? errorMsg : 'SMS delivery failed');
    }
  } catch (error) {
    if (isProduction) {
      // Do not log real API key or real OTP in production
      console.error('Fast2SMS request error occurred.');
    } else {
      console.error('Fast2SMS error:', error.message);
    }
    throw new Error(error.message || 'Failed to dispatch SMS verification OTP');
  }
}

module.exports = { sendSmsOtp };
