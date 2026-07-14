const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  festivalName: {
    type: String,
    required: true,
    trim: true
  },
  festivalDate: {
    type: Date,
    required: true
  },
  associatedMission: {
    type: String,
    required: true,
    trim: true
  },
  donationCampaign: {
    type: String,
    trim: true
  },
  donationLink: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Festival', festivalSchema);
