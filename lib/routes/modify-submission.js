let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Presenter = require('../models').Presenter;

module.exports = (app) => {
    app.get('/modify-submission', (req, res) => {
        Submission.findById(req.query.id, (err, submission) => {
            res.render('modify-submission', { submission: submission });
        });
    });

    app.post('/modify-submission', (req, res) => {
        Submission.findById(req.body.id, (err, submission) => {
            submission.title = req.body.title;
            submission.abstract = req.body.abstract;
            submission.save((err) => {
                res.redirect('/view-submission-details?id=' + submission._id);
            });
        });
    });
};
