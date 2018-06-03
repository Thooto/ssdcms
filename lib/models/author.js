const mongoose = require('mongoose');

let authorSchema = mongoose.Schema({
    name: String,
    email: String,
    affiliation: String
});

module.exports = mongoose.model('Author', authorSchema);
