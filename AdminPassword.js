const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const initAdminPassword = async () => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      const newAdmin = new Admin({ adminPassword: process.env.ADMIN_PASSWORD });
      await newAdmin.save();
      console.log('Default admin password initialized');
    } else {
      console.log('Admin password already exists');
    }
  } catch (err) {
    console.error('Error initializing admin password:', err);
  }
};

module.exports = initAdminPassword;
