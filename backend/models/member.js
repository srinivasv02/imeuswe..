const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  profilePic: String, 
  relationship: String,
  firstName: String,
  middleName: String,
  lastName: String,
  status: String,
  birthDate: Date,
  birthPlace: String,
  currentPlace: String
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
