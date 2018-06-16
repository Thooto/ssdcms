let ObjectId = require('mongoose').Types.ObjectId

let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.get('/details/:id', isLoggedIn, async (req, res) => {

    let submission = await Submission.findById(req.params.id).then(submission => submission)
    let feedback = await Feedback.findById(submission.feedback).then(feedback => feedback)

    /*if (submission.authors.length == 1)
    	submission.authors = submission.authors[0].split(',')*/

    let authorIds = Array.from(submission.authors.filter(id => id != ''), id => ObjectId(id))
    let authors = await Author.find({ _id: { $in: authorIds }}).then(authors => authors)

    res.render('details', { submission: submission, authors:authors, feedback:feedback,role:req.session.role})
  })
}
