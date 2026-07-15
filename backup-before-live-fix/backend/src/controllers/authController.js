const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OtpSession = require('../models/OtpSession');
const crypto = require('crypto');
const { sendSmsOtp } = require('../utils/sendSms');
const { sendWhatsappOtp } = require('../utils/sendWhatsapp');
const mongoose = require('mongoose');

const mockOtpSessions = [];

// Helper to generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your_jwt_super_secret_key', {
    expiresIn: '30d'
  });
};

// Helper to generate temp OTP Token
const generateTempToken = (mobile) => {
  return jwt.sign({ mobile }, process.env.JWT_SECRET || 'your_jwt_super_secret_key', {
    expiresIn: '15m' // 15 mins validity to register or reset password
  });
};

// @desc    Send OTP
// @route   POST /api/auth/send-otp
exports.sendOtp = async (req, res, next) => {
  const { mobile, purpose, deliveryMethod = "sms" } = req.body;

  if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit Indian mobile number' });
  }

  if (!deliveryMethod || !['sms', 'whatsapp'].includes(deliveryMethod)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid delivery method (sms or whatsapp)' });
  }

  const validPurposes = ["register", "login", "reset-password", "certificate-verification", "donation", "membership"];
  if (!purpose || !validPurposes.includes(purpose)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid OTP purpose' });
  }

  const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);
  const OTP_RESEND_SECONDS = parseInt(process.env.OTP_RESEND_SECONDS || '60', 10);
  const isLiveOtp = process.env.OTP_MODE === "live";

  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    // Check resend cooldown
    let existingSession;
    if (isDbConnected) {
      existingSession = await OtpSession.findOne({ mobile, purpose });
    } else {
      existingSession = mockOtpSessions.find(s => s.mobile === mobile && s.purpose === purpose);
    }

    if (existingSession) {
      const timeSinceCreation = (Date.now() - new Date(existingSession.createdAt).getTime()) / 1000;
      if (timeSinceCreation < OTP_RESEND_SECONDS) {
        const waitTime = Math.ceil(OTP_RESEND_SECONDS - timeSinceCreation);
        return res.status(429).json({ 
          success: false, 
          message: `Please wait ${waitTime} seconds before requesting another OTP.` 
        });
      }
    }

    // Invalidate previous OTP sessions
    if (isDbConnected) {
      await OtpSession.deleteMany({ mobile, purpose });
    } else {
      const index = mockOtpSessions.findIndex(s => s.mobile === mobile && s.purpose === purpose);
      if (index !== -1) mockOtpSessions.splice(index, 1);
    }

    const otp = isLiveOtp
      ? crypto.randomInt(100000, 1000000).toString()
      : "123456";

    // Send SMS
    if (isLiveOtp) {
      if (deliveryMethod === 'sms') {
        if (!process.env.FAST2SMS_API_KEY || !process.env.FAST2SMS_OTP_ID) {
          return res.status(500).json({ success: false, message: 'SMS service is not fully configured on server.' });
        }
        await sendSmsOtp(mobile, otp);
      } else {
        return res.status(400).json({ success: false, message: 'WhatsApp OTP is temporarily unavailable. Please use SMS.' });
      }
    } else {
      // Print only in test mode
      console.log(`[TEST MODE] OTP Code for ${mobile}: ${otp}`);
    }

    // Hash and Save
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);
    const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    if (isDbConnected) {
      await OtpSession.create({
        mobile,
        otpHash,
        purpose,
        expiresAt: expiry,
        provider: 'fast2sms',
        providerRequestId: `req_${Date.now()}`
      });
    } else {
      mockOtpSessions.push({
        mobile,
        otpHash,
        purpose,
        expiresAt: expiry,
        attempts: 0,
        createdAt: new Date()
      });
    }

    if (isLiveOtp) {
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        testMode: false,
        deliveryMode: "sms",
        expiresIn: OTP_EXPIRY_MINUTES * 60
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Test OTP generated. Use 123456.",
        testMode: true,
        testOtp: "123456",
        expiresIn: OTP_EXPIRY_MINUTES * 60
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
exports.verifyOtp = async (req, res, next) => {
  const { mobile, otp, purpose } = req.body;

  if (!mobile || !otp || !purpose) {
    return res.status(400).json({ success: false, message: 'Please provide mobile, otp, and purpose' });
  }

  const isLiveOtp = process.env.OTP_MODE === "live";
  const OTP_MAX_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || '5', 10);

  // Validate OTP is exactly 6 digits
  if (!/^\d{6}$/.test(otp)) {
    return res.status(400).json({ success: false, message: 'OTP must be exactly 6 numeric digits' });
  }

  try {
    // Only allow test bypass when not in live OTP mode
    if (!isLiveOtp && otp === '123456') {
      const isDbConnected = mongoose.connection.readyState === 1;
      if (isDbConnected) {
        await OtpSession.deleteMany({ mobile, purpose });
      } else {
        const index = mockOtpSessions.findIndex(s => s.mobile === mobile && s.purpose === purpose);
        if (index !== -1) mockOtpSessions.splice(index, 1);
      }
      const tempToken = generateTempToken(mobile);
      return res.status(200).json({ 
        success: true, 
        message: 'OTP verified successfully (Test Mode Bypass)', 
        tempToken 
      });
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    let otpRecord;

    if (isDbConnected) {
      otpRecord = await OtpSession.findOne({ mobile, purpose });
    } else {
      otpRecord = mockOtpSessions.find(s => s.mobile === mobile && s.purpose === purpose);
    }

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'No active OTP found or expired' });
    }

    if (otpRecord.expiresAt < new Date()) {
      if (isDbConnected) {
        await OtpSession.deleteOne({ _id: otpRecord._id });
      } else {
        const index = mockOtpSessions.indexOf(otpRecord);
        if (index !== -1) mockOtpSessions.splice(index, 1);
      }
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    // Locked OTP must not be verified
    if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
      return res.status(400).json({ success: false, message: 'OTP is locked. Please request a new one.' });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);

    if (!isMatch) {
      otpRecord.attempts += 1;
      if (isDbConnected) {
        await otpRecord.save();
      }
      if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
        return res.status(400).json({ success: false, message: 'Max attempts exceeded, OTP is locked. Please request a new one.' });
      }
      return res.status(400).json({ success: false, message: 'Incorrect verification OTP' });
    }

    // Clear verification key
    if (isDbConnected) {
      await OtpSession.deleteOne({ _id: otpRecord._id });
    } else {
      const index = mockOtpSessions.indexOf(otpRecord);
      if (index !== -1) mockOtpSessions.splice(index, 1);
    }

    const tempToken = generateTempToken(mobile);

    return res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully',
      tempToken
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Register a new User
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  const { mobile, password, fullName, email, role } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ success: false, message: 'Please provide mobile and password' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ mobile });
    if (user) {
      return res.status(400).json({ success: false, message: 'User with this mobile number is already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    user = await User.create({
      mobile,
      passwordHash,
      fullName,
      email,
      role: role || 'donor',
      isVerified: true
    });

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        mobile: user.mobile,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Login User
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ success: false, message: 'Please provide mobile and password' });
  }

  try {
    const user = await User.findOne({ mobile });
    if (!user || !user.passwordHash) {
      return res.status(400).json({ success: false, message: 'Invalid mobile number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid mobile number or password' });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        mobile: user.mobile,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Reset password (verifying OTP)
// @route   POST /api/auth/reset-password
exports.resetPassword = async (req, res, next) => {
  const { mobile, otp, newPassword } = req.body;

  if (!mobile || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: 'Please specify mobile, otp, and newPassword' });
  }

  const isLiveOtp = process.env.OTP_MODE === "live";

  try {
    let tokenVerified = false;
    // Check verification OTP (either test mode bypass, tempToken JWT, or OtpSession check)
    if (!isLiveOtp && otp === '123456') {
      tokenVerified = true;
    } else {
      try {
        const decoded = jwt.verify(otp, process.env.JWT_SECRET || 'your_jwt_super_secret_key');
        if (decoded.mobile === mobile) {
          tokenVerified = true;
        }
      } catch (err) {
        // Not a valid JWT or expired, fallback to OtpSession database record check
      }
    }

    if (!tokenVerified) {
      const isDbConnected = mongoose.connection.readyState === 1;
      let otpRecord;

      if (isDbConnected) {
        otpRecord = await OtpSession.findOne({ mobile, purpose: 'reset-password' });
      } else {
        otpRecord = mockOtpSessions.find(s => s.mobile === mobile && s.purpose === 'reset-password');
      }

      if (!otpRecord) {
        return res.status(400).json({ success: false, message: 'Expired or missing OTP record' });
      }

      if (otpRecord.attempts >= parseInt(process.env.OTP_MAX_ATTEMPTS || '5', 10)) {
        return res.status(400).json({ success: false, message: 'OTP is locked. Please request a new one.' });
      }

      const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
      if (!isMatch) {
        otpRecord.attempts += 1;
        if (isDbConnected) await otpRecord.save();
        return res.status(400).json({ success: false, message: 'Incorrect verification OTP' });
      }

      if (isDbConnected) {
        await OtpSession.deleteOne({ _id: otpRecord._id });
      } else {
        const index = mockOtpSessions.indexOf(otpRecord);
        if (index !== -1) mockOtpSessions.splice(index, 1);
      }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not registered' });
    }

    user.passwordHash = passwordHash;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });

  } catch (err) {
    next(err);
  }
};
