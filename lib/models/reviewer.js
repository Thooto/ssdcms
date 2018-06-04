const mongoose = require('mongoose');

// Define the schema for reviewers
let reviewerSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    affiliation: String
});

// Export the mongoose model
module.exports = mongoose.model('Reviewer', reviewerSchema);
