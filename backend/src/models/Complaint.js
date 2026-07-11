const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true }, // e.g. CMP-000123
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  dateOfIncident: { type: Date },
  evidenceUrl: { type: String }, // Cloudinary URL
  status: { type: String, enum: ['pending', 'investigating', 'resolved', 'closed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
