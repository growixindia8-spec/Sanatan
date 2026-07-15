const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  sectionKey: { type: String, required: true, unique: true },
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  content: { type: String },
  imageUrl: { type: String },
  buttonText: { type: String },
  buttonUrl: { type: String },
  isPublished: { type: Boolean, default: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteContent', siteContentSchema);
