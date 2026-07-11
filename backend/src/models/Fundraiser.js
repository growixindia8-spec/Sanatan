const mongoose = require('mongoose');

const fundraiserSchema = new mongoose.Schema({
  type: { type: String, enum: ['normal', 'emergency'], required: true },
  applicantName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  cityState: { type: String, required: true },
  applyingAs: { type: String, required: true },
  campaignCategory: { type: String, required: true },
  campaignTitle: { type: String, required: true },
  briefDescription: { type: String, required: true },
  beneficiaryType: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  estimatedAmount: { type: Number },
  duration: { type: String },
  timeSensitivity: { type: String },
  backgroundOfCase: { type: String },
  beneficiaryName: { type: String },
  idProofUrl: { type: String },
  supportingDocsUrls: [{ type: String }],
  photoVideoUrl: { type: String },
  visibilityPublic: { type: Boolean, default: true },
  identityHidden: { type: Boolean, default: false },
  fundTransferMode: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  raisedAmount: { type: Number, default: 0 },  // manual update by admin (Razorpay auto later)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fundraiser', fundraiserSchema);
