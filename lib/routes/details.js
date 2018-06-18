let ObjectId = require('mongoose').Types.ObjectId


// We need submission, authors and feedback models for this route to interact with the database
let Submission = require('../models').Submission
let Author = require('../models').Author
let Feedback = require('../models').Feedback


module.exports = (app, isLoggedIn) => {

  // When the user requests details of a given submission
  app.get('/details/:id', isLoggedIn, async (req, res) => {

    // We gather requested submission and the associated feedack
    let submission = await Submission.findById(req.params.id).then(submission => submission)
    let feedback = await Feedback.findById(submission.feedback).then(feedback => feedback)


    // The author ids are stored as string in the database, we format them to be ObjectIds for the database to find them.
    let authorIds = Array.from(submission.authors.filter(id => id != ''), id => ObjectId(id))
    let authors = await Author.find({ _id: { $in: authorIds }}).then(authors => authors)


    // We render the view
    res.render('details', { submission: submission, authors: authors, feedback:feedback, role: req.session.role})
  })
}














// EOF
