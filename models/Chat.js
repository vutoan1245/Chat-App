const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
});

module.exports = Chat = mongoose.model('chat', UserSchema);