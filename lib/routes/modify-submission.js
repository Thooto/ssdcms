let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Presenter = require('../models').Presenter;

module.exports = (app) => {
    // If a presenter is required to modify his submission
    app.get('/modify-submission', (req, res) => {
        // Find the submission by id and render the view
        Submission.findById(req.query.id, (err, submission) => {
            res.render('modify-submission', { submission: submission });
        });
    });

    // When the presenter has modified his submission
    app.post('/modify-submission', (req, res) => {
        // Find the submission by id to update it, then save it and redirect presenter
        Submission.findById(req.body.id, (err, submission) => {
            submission.title = req.body.title;
            submission.abstract = req.body.abstract;
            submission.save((err) => {
                res.redirect('/view-submission-details?id=' + submission._id);
            });
        });
    });
};
