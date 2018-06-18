// Intermediary file to redirect imports to folder-specific files


// We require presenter and submission models for the routes to interact with them
let Presenter = require('../models').Presenter
let Submission = require('../models').Submission


// Function to check if the user is authenticated (as attendant or reviewer)
function isLoggedIn(req, res, next) {
  if (req.session.attendant || req.session.reviewer) return next()

  // If the user isn't authenticated, redirect him to the login page
  res.redirect('/login')
}


module.exports = (app, passport) => {

  // Index route
  app.get('/', isLoggedIn, (req, res) => {

    // If the logged in user is an attendant, display his associated submissions
    if (req.session.attendant)
      // Find if the attendant is also a presenter (which means he already sent a submission)
      Presenter.findOne({attendant:req.session.attendant._id},(err, presenter) => {
        if (presenter)
          Submission.find({presenter:presenter._id},(err, submissions) => {
            return res.render('index', {attendant: req.session.attendant, submissions:submissions})
          })
        else return res.render('index', { attendant: req.session.attendant, submissions: [] })
      })


    // If the user is logged in as a reviewer, find the possible associated submissions
    if (req.session.reviewer)
      Submission.find({reviewer: req.session.reviewer._id}, (err, submissions) => {
          return res.render('index', {attendant: req.session.reviewer, submissions: submissions})
      })
  })


  // Declare all the routes
  require('./attendant.js')(app, isLoggedIn)
  require('./send-submission.js')(app, isLoggedIn)
  require('./details.js')(app, isLoggedIn)
  require('./modify.js')(app, isLoggedIn)
  require('./review.js')(app, isLoggedIn)

  require('./login.js')(app)
  require('./logout.js')(app)


  // Admin view routes
  require('./assign-reviewer.js')(app)
  require('./register-reviewer.js')(app)
  require('./register-attendant.js')(app)


  // Operation success page
  app.get('/operation', (req, res) => {
    res.render('operation', { message: req.flash('operation message'), attendant: true })
  })
}
