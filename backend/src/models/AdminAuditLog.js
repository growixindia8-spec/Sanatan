const mongoose = require('mongoose');

const adminAuditLogSchema = new mongoose.Schema({
  adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g. "approve-member", "update-content"
  resourceType: { type: String, required: true }, // e.g. "Membership", "SiteContent"
  resourceId: { type: String },
  summary: { type: String, required: true }, // human readable summary
  previousValues: { type: mongoose.Schema.Types.Mixed },
  newValues: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminAuditLog', adminAuditLogSchema);
