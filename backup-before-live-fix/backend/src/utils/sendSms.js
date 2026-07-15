const axios = require('axios');

async function sendSmsOtp(mobile, otp) {
  if (!process.env.FAST2SMS_API_KEY || !process.env.FAST2SMS_OTP_ID) {
    throw new Error('SMS service is not fully configured (missing API key or OTP template ID).');
  }

  try {
    const payload = {
      otp_id: process.env.FAST2SMS_OTP_ID,
      mobile: mobile,
      variables_values: otp,
      expiry: process.env.OTP_EXPIRY_MINUTES || "5"
    };

    const res = await axios.post('https://www.fast2sms.com/dev/otp/send', payload, {
      headers: { 
        'Authorization': process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10s timeout
    });

    if (res.data && (res.data.return === true || res.data.status === 'success' || res.data.message === 'OTP sent successfully')) {
      return res.data;
    } else {
      const errorStatus = res.data ? (res.data.message || res.data.status_code || 'unsuccessful') : 'no response data';
      throw new Error(`Fast2SMS rejected OTP request with status: ${errorStatus}`);
    }
  } catch (error) {
    // Log only the safe provider status/error code, NOT the API key or OTP
    const statusMsg = error.response ? `HTTP_${error.response.status}` : error.message;
    console.error(`Fast2SMS send error: ${statusMsg}`);
    throw new Error('OTP भेजने में समस्या हुई। कृपया कुछ समय बाद पुनः प्रयास करें।');
  }
}

module.exports = { sendSmsOtp };
