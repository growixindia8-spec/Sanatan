require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const donationRoutes = require('./src/routes/donationRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const fundraiserRoutes = require('./src/routes/fundraiserRoutes');
const verificationRoutes = require('./src/routes/verificationRoutes');
const portalRoutes = require('./src/routes/portalRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const csrRoutes = require('./src/routes/csrRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const newsletterRoutes = require('./src/routes/newsletterRoutes');
const festivalRoutes = require('./src/routes/festivalRoutes');
const adminFestivalRoutes = require('./src/routes/adminFestivalRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB using startServer cycle below

// Global Middlewares
app.use(helmet());

// CORS setup
const allowedOrigins = [];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push("http://localhost:5173");
  allowedOrigins.push("http://localhost:5174");
}
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
if (process.env.PORTAL_URL) {
  allowedOrigins.push(process.env.PORTAL_URL);
}

// Clean up origins
const uniqueOrigins = [...new Set(allowedOrigins.filter(Boolean))];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || uniqueOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Health check endpoint (placed before rate limiter to avoid blocks)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "Backend is running"
  });
});

// Apply rate limiter to general api calls
app.use('/api/', apiLimiter);

// Map API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/membership', memberRoutes);
app.use('/api/fundraiser', fundraiserRoutes);
app.use('/api/verify', verificationRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/csr', csrRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/festivals', festivalRoutes);
app.use('/api/admin/festivals', adminFestivalRoutes);
app.use('/api/admin', adminRoutes);

// Base route check
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Sanatan Dharm Foundation API Server is fully operational' });
});

// Global Error Handler
app.use(errorHandler);

function validateEnvironment() {
  const otpMode = process.env.OTP_MODE || "test";
  const razorpayMode = process.env.RAZORPAY_MODE || "test";

  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
    console.error("FATAL ERROR: MONGO_URI must start with mongodb:// or mongodb+srv://");
    process.exit(1);
  }

  const jwtSecret = process.env.JWT_SECRET || "";
  if (!jwtSecret || jwtSecret.toLowerCase().includes("placeholder") || jwtSecret.toLowerCase().includes("your_")) {
    console.error("FATAL ERROR: JWT_SECRET must not be blank or placeholder text.");
    process.exit(1);
  }

  if (otpMode === "live") {
    const fast2SmsKey = process.env.FAST2SMS_API_KEY || "";
    if (!fast2SmsKey || fast2SmsKey.toLowerCase().includes("placeholder") || fast2SmsKey.toLowerCase().includes("your_")) {
      console.error("FATAL ERROR: FAST2SMS_API_KEY must not be blank or placeholder text when OTP_MODE is set to live.");
      process.exit(1);
    }
    const fast2SmsOtpId = process.env.FAST2SMS_OTP_ID || "";
    if (!fast2SmsOtpId || fast2SmsOtpId.toLowerCase().includes("placeholder") || fast2SmsOtpId.toLowerCase().includes("your_")) {
      console.error("FATAL ERROR: FAST2SMS_OTP_ID must not be blank or placeholder text when OTP_MODE is set to live.");
      process.exit(1);
    }
  }

  if (razorpayMode === "live") {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "";
    if (!razorpayKeyId || razorpayKeyId.toLowerCase().includes("placeholder") || razorpayKeyId.toLowerCase().includes("your_")) {
      console.error("FATAL ERROR: RAZORPAY_KEY_ID must not be blank or placeholder text when RAZORPAY_MODE is set to live.");
      process.exit(1);
    }
    if (!razorpayKeyId.startsWith("rzp_live_")) {
      console.error("FATAL ERROR: RAZORPAY_KEY_ID must start with rzp_live_ when RAZORPAY_MODE is set to live.");
      process.exit(1);
    }
    if (razorpayKeyId.startsWith("rzp_test_")) {
      console.error("FATAL ERROR: Test keys (starting with rzp_test_) are rejected when RAZORPAY_MODE is set to live.");
      process.exit(1);
    }
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET || "";
    if (!razorpaySecret || razorpaySecret.toLowerCase().includes("placeholder") || razorpaySecret.toLowerCase().includes("your_")) {
      console.error("FATAL ERROR: RAZORPAY_KEY_SECRET must not be blank or placeholder text when RAZORPAY_MODE is set to live.");
      process.exit(1);
    }
  }

  console.log("-----------------------------------------");
  console.log(`MongoDB URI: ${mongoUri ? "configured" : "not configured"}`);
  console.log(`JWT secret: ${jwtSecret ? "configured" : "not configured"}`);
  console.log(`OTP mode: ${otpMode}`);
  console.log(`Fast2SMS key: ${process.env.FAST2SMS_API_KEY ? "configured" : "not configured"}`);
  console.log(`Fast2SMS OTP ID: ${process.env.FAST2SMS_OTP_ID ? "configured" : "not configured"}`);
  console.log(`Razorpay mode: ${razorpayMode}`);
  console.log(`Razorpay live key: ${process.env.RAZORPAY_KEY_ID ? "configured" : "not configured"}`);
  console.log("-----------------------------------------");
}

// Listen to Port
const PORT = process.env.PORT || 5000;

async function startServer() {
  validateEnvironment();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup failed:", err.message);
  process.exit(1);
});
