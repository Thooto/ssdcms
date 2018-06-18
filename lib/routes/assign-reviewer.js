// We need reviewer and submission models for this route to interact with the database
const Reviewer = require('../models').Reviewer
const Submission = require('../models').Submission


module.exports = (app) => {
  // When the manager requires to add a new reviewer
  app.get('/admin/assign-reviewer', (req, res) => {
    // Find all reviewers and submissions
    Reviewer.find((err, reviewers) => {
      Submission.find((err, submissions) => {
        // Render view
        res.render('assign-reviewer', { reviewers: reviewers, submissions:submissions, message: req.flash('message') })
      })
    })
  })

  // When the manager requires to assign a reviewer
  app.post('/admin/assign-reviewer', (req, res) => {
    // Find the requested reviewer and submission
    Reviewer.findById(req.body.reviewer,(err, reviewer) => {
      Submission.findById(req.body.submission,(err, submission) => {
        // Update submission parameters
        submission.reviewer = reviewer._id
        submission.save()

        // Redirect after successful assignment
        req.flash('message', ' Successful Assignment')
        res.redirect('/admin/assign-reviewer')
      })
    })
  })
}
