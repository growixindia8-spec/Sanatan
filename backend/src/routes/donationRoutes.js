const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/bank-transfer', upload.single('paymentScreenshot'), donationController.bankTransfer);
router.post('/razorpay/create-order', donationController.createRazorpayOrder);
router.post('/razorpay/verify-payment', donationController.verifyRazorpayPayment);

// Admin only routes
router.get('/:id', protect, authorize('admin'), donationController.getDonationById);
router.patch('/:id/verify', protect, authorize('admin'), donationController.verifyDonation);

module.exports = router;
