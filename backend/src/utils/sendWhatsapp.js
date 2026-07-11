const axios = require('axios');

async function sendWhatsappOtp(mobile, otp) {
  if (!process.env.WHATSAPP_PHONE_ID || !process.env.WHATSAPP_ACCESS_TOKEN) {
    console.log(`[WHATSAPP MOCK] Mobile: ${mobile}, OTP Code: ${otp}`);
    return { success: true, message: 'WhatsApp tokens missing, operating in mock mode' };
  }

  try {
    const res = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: `91${mobile}`,
        type: 'template',
        template: {
          name: 'otp_verification',
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: otp }
              ]
            }
          ]
        }
      },
      {
        headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` }
      }
    );
    return res.data;
  } catch (error) {
    console.error('WhatsApp API error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to dispatch WhatsApp verification OTP');
  }
}

module.exports = { sendWhatsappOtp };
