const mongoose = require('mongoose');

// Define the schema for attendants
let attendantSchema = mongoose.Schema({
    name: String,
    email: String,
    affiliation: String
});

// Export the mongoose model
module.exports = mongoose.model('Attendant', attendantSchema);
