const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { otpLimiter } = require('../middleware/rateLimiter');

router.post('/send-otp', otpLimiter, authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
