let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.get('/details/:id', isLoggedIn, (req, res) => {
  	Submission.findById(req.params.id,(err, submission) => {
  		//Here we need to obtain the authors of submission.authors
  		authors=[]
  		Feedback.findById(submission.feedback,(err, feedback) => {
  			res.render('details', { submission: submission, authors:authors,feedback:feedback });
  		});
   	});
  })
}
