const mongoose = require('mongoose');

const financialReportSchema = new mongoose.Schema({
  reportTitle: { type: String, required: true },
  fiscalYear: { type: String, required: true },
  categoryTag: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Cloudinary PDF URL
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FinancialReport', financialReportSchema);
