const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  documentType: { 
    type: String, 
    enum: ['volunteer-id', 'member-certificate', 'coordinator-id', 'donation-receipt', 'appointment-letter'],
    required: true 
  },
  credentialNumber: { type: String, required: true, unique: true }, // credential code search key
  recipientName: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Suspended', 'Expired'], default: 'Active' },
  issuedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
