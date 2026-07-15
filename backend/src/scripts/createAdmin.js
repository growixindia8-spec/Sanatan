require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const dbUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/sanatan';

const createAdmin = async () => {
  const args = process.argv.slice(2);
  
  // Filter out flags like --update
  const hasUpdateFlag = args.includes('--update');
  const cleanArgs = args.filter(a => a !== '--update');

  const mobile = cleanArgs[0];
  const password = cleanArgs[1];
  const fullName = cleanArgs[2] || 'System Administrator';
  const zone = cleanArgs[3] || 'All India';
  const role = cleanArgs[4] || 'admin'; // 'admin' or 'superadmin'

  if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
    console.error('ERROR: Please provide a valid 10-digit Indian mobile number as the first argument.');
    process.exit(1);
  }

  // Strong password validation: min 8 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    console.error('ERROR: Please provide a strong password as the second argument (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char like @$!%*?&).');
    process.exit(1);
  }

  if (!['admin', 'superadmin'].includes(role)) {
    console.error('ERROR: Role must be either "admin" or "superadmin".');
    process.exit(1);
  }

  console.log('Connecting to database...');
  try {
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
      if (!hasUpdateFlag) {
        console.warn(`\nWARNING: User with mobile ${mobile} already exists in the database.`);
        console.warn('To update this user\'s password, role to administrative, status, etc., re-run the command with the "--update" flag.');
        console.warn('Example: npm run create-admin -- 9876543210 "StrongPassword@2026" "Name" "Zone" "admin" --update\n');
        process.exit(0);
      }

      console.log(`Updating existing user ${mobile} role to "${role}" and setting password...`);
      user.role = role;
      user.passwordHash = passwordHash;
      user.fullName = fullName;
      user.zone = zone;
      user.status = 'active';
      user.isVerified = true;
      await user.save();
      console.log('User updated successfully to administrator role.');
    } else {
      console.log(`Creating new user with mobile ${mobile} and role "${role}"...`);
      user = await User.create({
        mobile,
        passwordHash,
        fullName,
        email: `${role}@sanatan.org`,
        role,
        zone,
        status: 'active',
        isVerified: true
      });
      console.log('Admin user created successfully.');
    }

    console.log('\n--- Admin Account Synchronized ---');
    console.log(`Mobile:   ${mobile}`);
    console.log(`Role:     ${role}`);
    console.log(`Name:     ${fullName}`);
    console.log(`Zone:     ${zone}`);
    console.log('----------------------------------\n');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  }
};

createAdmin();
