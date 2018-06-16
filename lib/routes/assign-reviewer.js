let Reviewer = require('../models').Reviewer;
let Submission = require('../models').Submission;


module.exports = (app) => {
    // When the manager requires to add a new reviewer
    app.get('/admin/assign-reviewer', (req, res) => {
        // Find all reviewers and submission and render view
        Reviewer.find((err, reviewers) => {
            Submission.find((err, submissions) => {
                res.render('assign-reviewer', { reviewers: reviewers, submissions:submissions, message: req.flash('message') });
            });
        });
    });

    // When the manager requires to assign a reviewer
    app.post('/admin/assign-reviewer', (req, res) => {
        Reviewer.findById(req.body.reviewer,(err, reviewer) => {
            Submission.findById(req.body.submission,(err, submission) => {
                submission.reviewer = reviewer._id;
                submission.save();
                req.flash('message', ' Succesful Assignment');
                res.redirect('/admin/assign-reviewer');
            });
        });
    });
};
