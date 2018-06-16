const mongoose = require('mongoose');

let feedbackSchema = mongoose.Schema({
  review: String,
  attachment: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);
