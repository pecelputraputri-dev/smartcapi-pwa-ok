// Skrip: jalankan sekali untuk membuat admin 'superadmin' (password 'admincapi')
// Usage: node scripts/create_admin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcapi';

async function main() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const username = process.env.ADMIN_USERNAME || 'superadmin';
  const password = process.env.ADMIN_PASSWORD || 'admincapi';
  const email = process.env.ADMIN_EMAIL || 'superadmin@example.com';

  let admin = await User.findOne({ username });
  if (admin) {
    console.log('Admin already exists:', username);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  admin = new User({
    email,
    username,
    name: 'Super Admin',
    role: 'admin',
    passwordHash,
  });
  await admin.save();
  console.log('Admin created:', username);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});