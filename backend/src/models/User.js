const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  passwordHash: { type: String },        // null until user sets password
  fullName: String,
  email: String,
  role: { type: String, enum: ['donor', 'volunteer', 'coordinator', 'admin'], default: 'donor' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
