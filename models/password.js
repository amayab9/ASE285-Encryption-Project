// models/Password.js
const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  hashedPassword: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Password', passwordSchema);
