let Reviewer = require('../models').Reviewer;
let Submission = require('../models').Submission;

//TODO

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
      // TODO
    });
};
