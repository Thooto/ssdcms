Attendant = require('../models').Attendant
Reviewer = require('../models').Reviewer

module.exports = app => {
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('login message')})
  })

  app.post('/login', (req, res) => {

    req.session.regenerate(async err => {
      let attendant = await Attendant.findByEmail(req.body.email).then(attendant => attendant)
      let reviewer = await Reviewer.findByEmail(req.body.email).then(reviewer => reviewer)

      if (!attendant && !reviewer) {
        req.flash('login message', 'This email doesn\'t correspond to any of the registered users')
        return res.redirect('/login')
      }

      if (attendant) {
        req.session.attendant = attendant;
        req.session.role = 'attendant';
      }
      if (reviewer){
        req.session.reviewer = reviewer;
        req.session.role = 'reviewer';
      }

      res.redirect('/');
    })

  })
}
