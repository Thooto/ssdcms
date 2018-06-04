let Submission = require('../models').Submission;
let Presenter = require('../models').Presenter;
let Author = require('../models').Author;

module.exports = (app) => {
    // When a presenter requires to see the submission details
    app.get('/view-submission-details', (req, res) => {
        // Find the submission by id
        Submission.findById(req.query.id, (err, submission) => {
            // Find the related authors and presenter then render view
            Author.find({ _id: { $in: submission.authors } }, (err, authors) => {
                Presenter.findById(submission.presenter, (err, presenter) => {
                    res.render('view-submission-details', { presenter: presenter, authors: authors, submission: submission });
                });
            });
        });
    });
};
