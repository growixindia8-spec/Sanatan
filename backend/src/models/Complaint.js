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
  status: { type: String, enum: ['new', 'pending', 'investigating', 'in-review', 'assigned', 'resolved', 'closed', 'rejected'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: [{
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
