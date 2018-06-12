const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const Attendant = require('../models').Attendant;


module.exports = (app) => {
  app.get('/register', (req, res) => {
    res.render('register', { message: req.flash('registerMessage') });
  });

  app.post('/register', [
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
    const errors = validationResult(req);
    req.flash('register message', Array.from(errors.array(), error => error.msg).join(', '));

    if (!errors.isEmpty()) res.render('register', { body: req.body, message: req.flash('register message') });
    else Attendant.create({
      email: req.body.email,
      name: req.body.name,
      affiliation: req.body.affiliation,
      type: req.body.type,
      payment: 'not provided',
      grantReq: 'not provided'
    }).then(res.redirect('/login'));
  });
}
