const mongoose = require('mongoose');
const dns = require('dns');

// Force IPv4 first DNS lookup to prevent querySrv ECONNREFUSED on some networks/dns setups
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/sanatan');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    console.warn('Backend server is running in offline database fallback mode.');
  }
};

module.exports = connectDB;
