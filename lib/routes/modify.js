let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.get('/modify/:id', isLoggedIn, (req, res) => {
  	Submission.findById(req.params.id,(err, submission) => {
  		//Here we need to obtain the authors of submission.authors
  		authors=[]
		res.render('modify', { submission: submission, authors:authors});
   	});
  })

  //Post method should made something almost equal as in send-submission
}
