let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.post('/review/:id', isLoggedIn, async (req, res) => {
  	submission = await Submission.findById(req.params.id).then(submission => submission)
	submission.status = req.body.status;

	if (submission.feedback != '')
		Feedback.findByIdAndRemove(submission.feedback,(err)=>{});

	let feedback = await Feedback.create({
	  review: req.body.review,
	  attachment: ''
	}).then(feedback => feedback)

	submission.feedback = feedback._id;
	submission.save();

	res.redirect('/details/'+req.params.id);
  })

}
