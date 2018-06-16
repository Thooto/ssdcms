let ObjectId = require('mongoose').Types.ObjectId

let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.get('/modify/:id', isLoggedIn, async (req, res) => {
	let submission = await Submission.findById(req.params.id).then(submission => submission);
    let authorIds = Array.from(submission.authors.filter(id => id != ''), id => ObjectId(id));
    let authors = await Author.find({ _id: { $in: authorIds }}).then(authors => authors);
	res.render('modify', { submission: submission, authors:authors});
  });

   app.post('/modify/:id', isLoggedIn, async (req, res) => {
	let submission = await Submission.findById(req.params.id).then(submission => submission);
    submission.status = 'sent';
    submission.save();
    //TODO
    res.redirect('/details/'+req.params.id);
  });
}
