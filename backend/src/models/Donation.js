const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  amount: { type: Number, required: true },
  contributionType: { type: String, enum: ['one-time', 'monthly', 'quarterly', 'yearly'], required: true },
  projectFor: { type: String, required: true },
  paymentMode: { type: String, enum: ['razorpay', 'bank-transfer', 'qr'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' },
  transactionRef: { type: String },          // UTR number for bank transfer
  paymentScreenshotUrl: { type: String },     // Cloudinary URL
  want80G: { type: Boolean, default: false },
  panNumber: { type: String },
  receiptUrl: { type: String },               // generated 80G receipt PDF Cloudinary URL
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  festivalId: { type: String },
  festivalName: { type: String },
  campaign: { type: String },
  sourceType: { type: String, default: 'direct' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
