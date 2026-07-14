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

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && deliveryMethod === 'whatsapp') {
    return res.status(400).json({
      success: false,
      message: "WhatsApp OTP is temporarily unavailable. Please use SMS."
    });
  }

  try {
    const isDevelopment = process.env.NODE_ENV !== "production";
    const otp = isDevelopment
      ? "123456"
      : crypto.randomInt(100000, 1000000).toString();

    // In production, send the SMS first before saving to DB
    if (!isDevelopment) {
      if (deliveryMethod === 'sms') {
        if (!process.env.FAST2SMS_API_KEY) {
          return res.status(500).json({ success: false, message: 'SMS service is not configured.' });
        }
        await sendSmsOtp(mobile, otp);
      }
    } else {
      console.log(`[DEVELOPMENT MODE] OTP Code sent to ${mobile} (purpose: ${purpose}, method: ${deliveryMethod}): ${otp}`);
    }

    // Hash OTP before saving to database
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    const isDbConnected = mongoose.connection.readyState === 1;
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    if (isDbConnected) {
      // Save/Overwrite OTP in database
      await OtpSession.deleteMany({ mobile, purpose });
      await OtpSession.create({
        mobile,
        otpHash,
        purpose,
        expiresAt: expiry
      });
    } else {
      console.warn("MongoDB is offline. Saving OTP session in-memory.");
      // Delete old matching mock session
      const index = mockOtpSessions.findIndex(s => s.mobile === mobile && s.purpose === purpose);
      if (index !== -1) {
        mockOtpSessions.splice(index, 1);
      }
      mockOtpSessions.push({
        mobile,
        otpHash,
        purpose,
        expiresAt: expiry,
        attempts: 0
      });
    }

    if (isDevelopment) {
      return res.status(200).json({ 
        success: true, 
        message: "Test OTP generated. Use 123456.",
        testOtp: "123456"
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully by SMS."
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

  const isDevelopment = process.env.NODE_ENV !== "production";

  try {
    // Check if test OTP bypass is triggered (only permitted in development/test!)
    if (isDevelopment && otp === '123456') {
      const isDbConnected = mongoose.connection.readyState === 1;
      if (isDbConnected) {
        await OtpSession.deleteMany({ mobile, purpose });
      } else {
        const index = mockOtpSessions.findIndex(s => s.mobile === mobile && s.purpose === purpose);
        if (index !== -1) {
          mockOtpSessions.splice(index, 1);
        }
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

    if (otpRecord.attempts >= 5) {
      if (isDbConnected) {
        await OtpSession.deleteOne({ _id: otpRecord._id });
      } else {
        const index = mockOtpSessions.indexOf(otpRecord);
        if (index !== -1) mockOtpSessions.splice(index, 1);
      }
      return res.status(400).json({ success: false, message: 'Max attempts exceeded, OTP deleted' });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);

    if (!isMatch) {
      otpRecord.attempts += 1;
      if (isDbConnected) {
        await otpRecord.save();
      }
      return res.status(400).json({ success: false, message: 'Invalid verification OTP' });
    }

    // Clear verification key
    if (isDbConnected) {
      await OtpSession.deleteOne({ _id: otpRecord._id });
    } else {
      const index = mockOtpSessions.indexOf(otpRecord);
      if (index !== -1) mockOtpSessions.splice(index, 1);
    }

    // Generate token for next step
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

  const isDevelopment = process.env.NODE_ENV !== "production";

  try {
    // Check verification OTP (either test mode bypass, tempToken JWT, or OtpSession check)
    let tokenVerified = false;
    if (isDevelopment && otp === '123456') {
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
      const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
      if (!isMatch) {
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
