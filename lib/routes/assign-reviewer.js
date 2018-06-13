let Reviewer = require('../models').Reviewer;
let Submission = require('../models').Submission;

module.exports = (app) => {
    // When the manager requires to add a new reviewer
    app.get('/admin/assign-reviewer', (req, res) => {
        // Find all reviewers and render view
        Reviewer.find((err, reviewers) => {
            res.render('assign-reviewer', { reviewers: reviewers });
        });
    });

    // When the manager requires to add a reviewer
    app.post('/admin/assign-reviewer', (req, res) => {
        // Declare a new instance of the reviewer model
        let reviewer = new Reviewer({
            name: req.body.name,
            email: req.body.email,
            affiliation: req.body.affiliation
        });

        // Save the newly created reviewer to the database
        reviewer.save((err, reviewer) => {
            // Find the associated submission and update it then redirect manager
            Submission.findById(req.body.submission, (err, submission) => {
                if (submission) {
                    submission.reviewer = reviewer._id;
                    submission.save((err) => {
                        res.redirect('/admin/assign-reviewer');
                    });
                } else res.redirect('/admin/assign-reviewer');
            });
        });
    });
};
