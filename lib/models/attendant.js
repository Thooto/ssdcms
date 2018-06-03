const mongoose = require('mongoose');

let attendantSchema = mongoose.Schema({
    name: String,
    email: String,
    affiliation: String
});

module.exports = mongoose.model('Attendant', attendantSchema);
