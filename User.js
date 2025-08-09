const mongoose = require('mongoose');

const adminVerifierSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['alumni', 'graduate', 'recruiter'] },
  messages: [String],
  links: [String],
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isSuspicious: { type: Boolean, default: false },
});


module.exports = mongoose.model('AdminVerifier', adminVerifierSchema, 'adminverifiers');
