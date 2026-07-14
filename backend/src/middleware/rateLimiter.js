const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: process.env.NODE_ENV === 'production' ? 5 : 50, // limit each IP to 5 OTP requests in production, 50 in development
  skip: (req) => req.method === 'OPTIONS',
  message: {
    success: false,
    message: 'Too many OTP requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? 1000 : 100, // limit general requests (1000 in development)
  skip: (req) => req.method === 'OPTIONS',
  message: {
    success: false,
    message: 'Too many requests. Please slow down.'
  }
});

module.exports = { otpLimiter, apiLimiter };
