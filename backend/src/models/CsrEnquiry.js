const mongoose = require('mongoose');

const csrEnquirySchema = new mongoose.Schema({
  contactPersonName: { type: String, required: true },
  organizationName: { type: String, required: true },
  designation: { type: String, required: true },
  emailId: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  companyWebsite: { type: String },
  industryType: { type: String, required: true },
  companyLocation: { type: String, required: true },
  isPanIndia: { type: Boolean, default: false },
  interestedInCollaboration: { type: String, enum: ['Yes', 'Need More Information', 'No'], required: true },
  // Yes fields
  focusAreas: [{ type: String }],
  contributionPreference: { type: String },
  contributionRange: { type: String },
  minCustomAmount: { type: Number },
  maxCustomAmount: { type: Number },
  budgetCycle: [{ type: String }],
  collaborationTypes: [{ type: String }],
  proposal: { type: String },
  // Need info fields
  query: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CsrEnquiry', csrEnquirySchema);
