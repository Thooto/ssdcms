let Submission = require('../models').Submission;
let Feedback = require('../models').Feedback;

module.exports = (app) => {
  // If a reviewer requires a presenter to modify his submission
  app.get('/send-requested-changes', (req, res) => {
    res.render('send-requested-changes');
  });

  // When the presenter has modified his submission
  app.post('/send-requested-changes', (req, res) => {
    Submission.findById(req.body.submission, (err, submission) => {
      console.log(req.body.submission);
      if (submission == null) res.send('This submission id doesn\'t exist.');
      else Feedback.findById(submission.feedback, (err, feedback) => {
        feedback.review = req.body.review;
        feedback.save(res.redirect('/view-submission-details?id=' + req.body.submission));
      });
    });
  });
};
