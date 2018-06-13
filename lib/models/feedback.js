const mongoose = require('mongoose');

let feedbackSchema = mongoose.Schema({
  review: String,
  attachment: String,
  submission: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);
