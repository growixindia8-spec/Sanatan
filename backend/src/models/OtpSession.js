const mongoose = require('mongoose');

const otpSessionSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  otpHash: { type: String, required: true },             // hashed OTP, never store plain
  purpose: { type: String, enum: ['register', 'login', 'reset-password'], required: true },
  expiresAt: { type: Date, required: true, expires: 0 },  // TTL auto deletion (expires: 0 means Mongoose uses expiresAt field directly)
  attempts: { type: Number, default: 0 },  // max 5 wrong tries allowed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OtpSession', otpSessionSchema);
