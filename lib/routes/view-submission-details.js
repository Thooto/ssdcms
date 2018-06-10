let Submission = require('../models').Submission;
let Presenter = require('../models').Presenter;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app) => {

  // When a presenter requires to see the submission details
  app.get('/view-submission-details', (req, res) => {

    // Find the submission by id
    Submission.findById(req.query.id, (err, submission) => {

      // If no submission id has been provided
      if (submission == null) res.send('Please specify a submission id (?id=...)');

      // Find the related authors and presenter and feedback then render view
      else Author.find({ _id: { $in: submission.authors } }, (err, authors) => {

        Presenter.findById(submission.presenter, (err, presenter) => {

          Feedback.findById(submission.feedback, (err, feedback) => {
            
            res.render('view-submission-details', { presenter: presenter, authors: authors, submission: submission, feedback: feedback });
          });
        });
      });
    });
  });
};
