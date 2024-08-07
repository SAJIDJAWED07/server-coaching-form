const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  adminPassword: { type: String, required: true }
});

AdminSchema.pre('save', async function (next) {
  if (this.isModified('adminPassword')) {
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  }
  next();
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
