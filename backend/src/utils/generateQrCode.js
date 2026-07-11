const QRCode = require('qrcode');

async function generateQrCode(text) {
  try {
    // Generate QR code as Data URL (Base64 string representing a PNG)
    const qrDataUrl = await QRCode.toDataURL(text);
    return qrDataUrl;
  } catch (error) {
    console.error('QR code generation error:', error.message);
    throw new Error('Failed to generate verification QR code');
  }
}

module.exports = { generateQrCode };
