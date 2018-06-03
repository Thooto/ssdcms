const mongoose = require('mongoose');

let presenterSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    affiliation: String
});

module.exports = mongoose.model('Presenter', presenterSchema);
