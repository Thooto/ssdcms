// Server-side form validation modules
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')


// To save the newly created attendant
const Attendant = require('../models').Attendant


module.exports = (app) => {

  // When the admin requires to create a new attendant, render view
  app.get('/admin/register-attendant', (req, res) => {
    res.render('register-attendant', { message: req.flash('register message') })
  })


  // When the admin has created a new attendant
  /*
  The middleware list checks the form data and will return an error if any of
  the inputs is wrong.
  */
  app.post('/admin/register-attendant', [
    check('email')
    .trim().normalizeEmail()
    .isEmail().withMessage('Must provide a valid email')
    .custom(email => Attendant.checkExists(email)),

    check('name').trim()
    .not().isEmpty().withMessage('Must provide a name'),

    check('affiliation').trim()
    .not().isEmpty().withMessage('Must provide an affiliation'),

    check('type').trim()
    .isIn(['student', 'other']).withMessage('Must provide a valid type')
  ], (req, res) => {

    // Verify all the form data
    const errors = validationResult(req)
    req.flash('register message', Array.from(errors.array(), error => error.msg).join(', '))


    // If there are errors, tell the admin, else create the new attendant
    if (!errors.isEmpty()) res.render('register-attendant', { message: req.flash('register message'), body: req.body })
    else Attendant.create({
      email: req.body.email,
      name: req.body.name,
      affiliation: req.body.affiliation,
      type: req.body.type,
      payment: 'not provided',
      grantReq: 'not provided'
    }).then(() => {

      // Callback after attendant creation, redirect to same page
      req.flash('register message', `Attendant ${req.body.name} successfully added`)
      res.redirect('/admin/register-attendant')
    })
  })
}
