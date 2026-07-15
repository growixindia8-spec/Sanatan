const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  passwordHash: { type: String },        // null until user sets password
  fullName: String,
  email: String,
  role: { type: String, enum: ['donor', 'volunteer', 'coordinator', 'admin', 'superadmin', 'viewer'], default: 'donor' },
  zone: { type: String },
  status: { type: String, enum: ['active', 'suspended', 'archived'], default: 'active' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
