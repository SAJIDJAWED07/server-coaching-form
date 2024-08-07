const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fatherPhoneNumber: { type: String, required: true },
  bFormCnic: { type: String, required: true },
  yourClass: { type: String, required: true },
  school: { type: String, required: true },
  college: { type: String, required: true },
  group: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  picture: { type: String, required: true }
});

module.exports = mongoose.model('Admission', admissionSchema);
