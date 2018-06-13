const mongoose = require('mongoose');

// Define the schema for submissions
let submissionSchema = mongoose.Schema({
  status: String,
  title: String,
  abstract: String,
  presenter: String,
  authors: [String],
  attachment: String,
  reviewer: String,
  feedback: String
});

// Export the mongoose model
module.exports = mongoose.model('Submission', submissionSchema);
