const mongoose = require('mongoose');

let reviewerSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    affiliation: String
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
