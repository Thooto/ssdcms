let Reviewer = require('../models').Reviewer;
let Submission = require('../models').Submission;


module.exports = (app) => {
    app.get('/add-reviewer', (req, res) => {
        Reviewer.find((err, reviewers) => {
            res.render('add-reviewer', { reviewers: reviewers });
        });
    });

    app.post('/add-reviewer', (req, res) => {
        let reviewer = new Reviewer({
            name: req.body.name,
            email: req.body.email,
            affiliation: req.body.affiliation
        });

        reviewer.save((err, reviewer) => {
            Submission.findById(req.body.submission, (err, submission) => {
                if (submission) {
                    submission.reviewer = reviewer._id;
                    submission.save((err) => {
                        res.redirect('/add-reviewer');
                    });
                } else res.redirect('/add-reviewer');
            });
        });
    });
};
