const mongoose = require('mongoose');

const fundraiserSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  applyingAs: { type: String, required: true },
  beneficiaryType: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  duration: { type: String },
  timeSensitivity: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },

  // Pre-existing fields to maintain full compatibility
  type: { type: String, enum: ['normal', 'emergency'] },
  cityState: { type: String },
  campaignCategory: { type: String },
  campaignTitle: { type: String },
  briefDescription: { type: String },
  estimatedAmount: { type: Number },
  backgroundOfCase: { type: String },
  beneficiaryName: { type: String },
  idProofUrl: { type: String },
  supportingDocsUrls: [{ type: String }],
  photoVideoUrl: { type: String },
  visibilityPublic: { type: Boolean, default: true },
  identityHidden: { type: Boolean, default: false },
  fundTransferMode: { type: String },

  // New fields from specification
  city: { type: String },
  state: { type: String },
  category: { type: String },
  title: { type: String },
  description: { type: String },
  isEmergency: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true },
  slug: { type: String }
});

module.exports = mongoose.model('Fundraiser', fundraiserSchema);
