const mongoose = require('mongoose');

// Define the schema for presenters
let presenterSchema = mongoose.Schema({
    author: String,
    attendant: String
});

// Export the mongoose model
module.exports = mongoose.model('Presenter', presenterSchema);
