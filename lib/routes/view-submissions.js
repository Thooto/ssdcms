let Submission = require('../models').Submission;
let Presenter = require('../models').Presenter;

module.exports = (app) => {
    app.get('/view-submissions', (req, res) => {
        Presenter.findOne({ email: req.query.email }, (err, presenter) => {
            Submission.find({ presenter: presenter._id }, (err, submissions) => {
                res.render('view-submissions', { presenter: presenter, submissions: submissions });
            });
        });
    });
};
