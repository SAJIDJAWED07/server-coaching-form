const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Admission = require('../models/Admission');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/', upload.single('picture'), async (req, res) => {
  try {
    const { fullName, fatherName, email, phoneNumber, fatherPhoneNumber, bFormCnic, fatherCnic, yourClass, school, college, group, gender, dateOfBirth, address } = req.body;
    let pictureUrl = '';

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }).end(req.file.buffer);
      });
      pictureUrl = result.secure_url;
    }

    const newAdmission = new Admission({
      fullName,
      fatherName,
      email,
      phoneNumber,
      fatherPhoneNumber,
      bFormCnic,
      fatherCnic,
      yourClass,
      school,
      college,
      group,
      gender,
      dateOfBirth,
      address,
      picture: pictureUrl,
    });

    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission);
  } catch (err) {
    console.error('Error in admission route:', err);
    res.status(500).json({ message: 'Error submitting admission', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
