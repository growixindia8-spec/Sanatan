require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const dbUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/sanatan';

const createAdmin = async () => {
  const args = process.argv.slice(2);
  const mobile = args[0] || '8888888888';
  const password = args[1] || 'adminpassword';
  const fullName = args[2] || 'System Admin';
  const zone = args[3] || 'Delhi';

  console.log('Connecting to database...');
  try {
    // Force IPv4 first DNS lookup to prevent querySrv ECONNREFUSED on some networks/dns setups
    const dns = require('dns');
    if (dns.setDefaultResultOrder) {
      dns.setDefaultResultOrder('ipv4first');
    }
    
    await mongoose.connect(dbUri);
    console.log('Database connected successfully.');

    // Check if user exists
    let user = await User.findOne({ mobile });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    if (user) {
      console.log(`User with mobile ${mobile} already exists. Updating role to "admin" and updating password...`);
      user.role = 'admin';
      user.passwordHash = passwordHash;
      user.fullName = fullName;
      user.zone = zone;
      user.isVerified = true;
      await user.save();
      console.log('Admin user updated successfully.');
    } else {
      console.log(`Creating new admin user with mobile ${mobile}...`);
      user = await User.create({
        mobile,
        passwordHash,
        fullName,
        email: 'admin@sanatan.org',
        role: 'admin',
        zone,
        isVerified: true
      });
      console.log('Admin user created successfully.');
    }

    console.log('\n--- Admin Details ---');
    console.log(`Mobile:   ${mobile}`);
    console.log(`Password: ${password}`);
    console.log(`Name:     ${fullName}`);
    console.log(`Zone:     ${zone}`);
    console.log('---------------------\n');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  }
};

createAdmin();
