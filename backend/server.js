require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
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

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiter to general api calls
app.use('/api/', apiLimiter);

// Map API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/fundraiser', fundraiserRoutes);
app.use('/api/verify', verificationRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/csr', csrRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Base route check
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Sanatan Dharm Foundation API Server is fully operational' });
});

// Global Error Handler
app.use(errorHandler);

// Listen to Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
