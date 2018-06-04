const mongoose = require('mongoose');

// Define the schema for presenters
let presenterSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    affiliation: String
});

// Export the mongoose model
module.exports = mongoose.model('Presenter', presenterSchema);
