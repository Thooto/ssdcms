let Submission = require('../models').Submission;
let Presenter = require('../models').Presenter;
let Author = require('../models').Author;

module.exports = (app) => {
    app.get('/view-submission-details', (req, res) => {
        Submission.findById(req.query.id, (err, submission) => {
            Author.find({ _id: { $in: submission.authors } }, (err, authors) => {
                Presenter.findById(submission.presenter, (err, presenter) => {
                    res.render('view-submission-details', { presenter: presenter, authors: authors, submission: submission });
                });
            });
        });
    });
};
