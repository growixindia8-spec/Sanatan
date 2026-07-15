const mongoose = require('mongoose');

const otpSessionSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  otpHash: { type: String, required: true },             // hashed OTP, never store plain
  purpose: { type: String, enum: ['register', 'login', 'reset-password', 'certificate-verification', 'donation', 'membership'], required: true },
  expiresAt: { type: Date, required: true, expires: 0 },  // TTL auto deletion
  attempts: { type: Number, default: 0 },  // max wrong tries allowed
  verified: { type: Boolean, default: false },
  usedAt: { type: Date },
  provider: { type: String, default: 'fast2sms' },
  providerRequestId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OtpSession', otpSessionSchema);
