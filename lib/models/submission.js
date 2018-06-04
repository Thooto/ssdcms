const mongoose = require('mongoose');

let submissionSchema = mongoose.Schema({
    title: String,
    abstract: String,
    presenter: String,
    authors: [String],
    reviewer: String
});



module.exports = mongoose.model('Submission', submissionSchema);
