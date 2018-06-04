let Submission = require('../models').Submission;
let Presenter = require('../models').Presenter;

module.exports = (app) => {
    // When a presenter requires to see all his submissions
    app.get('/view-submissions', (req, res) => {
        // Find the presenter by mail to get his id
        Presenter.findOne({ email: req.query.email }, (err, presenter) => {
            // Find all the submissions then render view
            Submission.find({ presenter: presenter._id }, (err, submissions) => {
                res.render('view-submissions', { presenter: presenter, submissions: submissions });
            });
        });
    });
};
