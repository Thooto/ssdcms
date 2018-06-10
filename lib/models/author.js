const mongoose = require('mongoose');

// Define the schema for authors
let authorSchema = mongoose.Schema({
  name: String,
  email: String,
  affiliation: String
});

// Export the mongoose model
module.exports = mongoose.model('Author', authorSchema);
