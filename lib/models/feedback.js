const mongoose = require('mongoose');

// Define the schema for feedbacks
let feedbackSchema = mongoose.Schema({
  review: String
});

// Export the mongoose model
module.exports = mongoose.model('Feedback', feedbackSchema);
