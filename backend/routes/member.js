const express = require('express');
const Member = require('../models/member');
const multer = require('multer');
const path = require('path');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.post('/', upload.single('profilePic'), async (req, res) => {
  try {
    const { relationship, firstName, middleName, lastName, status, birthDate, birthPlace, currentPlace } = req.body;
    const profilePic = req.file ? req.file.path : null;

    const newMember = new Member({
      profilePic,
      relationship,
      firstName,
      middleName,
      lastName,
      status,
      birthDate,
      birthPlace,
      currentPlace
    });

    await newMember.save();
    res.status(201).json({ message: 'Member added successfully' });
  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).json({ error: 'Error adding member' });
  }
});

module.exports = router;
