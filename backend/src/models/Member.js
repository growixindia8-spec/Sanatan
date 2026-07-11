const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberId: { type: String, unique: true },  // SDMKF-MH-000125 format, auto-generated
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  category: { type: String, enum: ['sanatani-sena', 'active-member', 'vigilance', 'seva-network', 'patron'], required: true },
  level: { type: String, required: true },               // e.g. "District Coordinator"
  amount: { type: Number, required: true },
  professionalCategory: { type: String }, // For Seva Network
  idCardRequired: { type: Boolean, default: false },
  photoUrl: { type: String },
  idProofUrl: { type: String },
  message: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  applicationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  qrCodeUrl: { type: String },             // generated QR code Cloudinary link
  idCardUrl: { type: String },              // generated ID card PDF Cloudinary link
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);
