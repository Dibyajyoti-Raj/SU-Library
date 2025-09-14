// models/studModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  sic: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Student', studentSchema);
