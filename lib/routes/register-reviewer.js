// Server-side form validation modules
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')


//To save the newly created reviewer
const Reviewer = require('../models').Reviewer


module.exports = (app) => {

  // When the admin wants to create a new reviewer account
  app.get('/admin/register-reviewer', (req, res) => {

    // Display list of reviewers
    Reviewer.find((err, reviewers) => {
      res.render('register-reviewer', {reviewers: reviewers, message: req.flash('register message')})
    })
  })


  // When the admin creates a new reviewer
  /*
  The middleware list checks the form data and will return an error if any of
  the inputs is wrong.
  */
  app.post('/admin/register-reviewer', [
    check('email')
    .trim().normalizeEmail()
    .isEmail().withMessage('Must provide a valid email')
    .custom(email => Reviewer.checkExists(email)),

    check('name').trim()
    .not().isEmpty().withMessage('Must provide a name'),

    check('affiliation').trim()
    .not().isEmpty().withMessage('Must provide an affiliation'),
  ], (req, res) => {

    // Verify all the form data
    const errors = validationResult(req)
    req.flash('register message', Array.from(errors.array(), error => error.msg).join(', '))


    // If there are errors, tell the admin, else create the new reviewer
    if (!errors.isEmpty()) {
      req.flash('register message', req.flash('register message'))
      res.redirect('/admin/register-reviewer')
    } else Reviewer.create({
      email: req.body.email,
      name: req.body.name,
      affiliation: req.body.affiliation
    }).then(() => {

      // When reviewer has been created, redirect admin
      req.flash('register message', `Reviewer ${req.body.name} successfully added`)
      res.redirect('/admin/register-reviewer')
    })
  })
}
