const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const Reviewer = require('../models').Reviewer;

module.exports = (app) => {
  app.get('/admin/register-reviewer', (req, res) => {
     Reviewer.find((err, reviewers) => {
            res.render('register-reviewer', {reviewers:reviewers, message: req.flash('register message')});
        });
    
  });

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
    const errors = validationResult(req);
    req.flash('register message', Array.from(errors.array(), error => error.msg).join(', '));

    if (!errors.isEmpty()) {
        req.flash('register message', req.flash('register message'));
        res.redirect('/admin/register-reviewer');
    }
    else Reviewer.create({
      email: req.body.email,
      name: req.body.name,
      affiliation: req.body.affiliation
    }).then(() => {
      req.flash('register message', `Reviewer ${req.body.name} successfully added`);
      res.redirect('/admin/register-reviewer');
    });
  });
}
