// To find associated accounts
Attendant = require('../models').Attendant
Reviewer = require('../models').Reviewer


module.exports = app => {

  // When user wants to log in
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('login message')})
  })


  // When user inputs an email
  app.post('/login', (req, res) => {

    // To make sure the session is regenerated (so that if change in account, previous account info will not be kept)
    req.session.regenerate(async err => {

      // Find eventual attendant or reviewer
      let attendant = await Attendant.findByEmail(req.body.email).then(attendant => attendant)
      let reviewer = await Reviewer.findByEmail(req.body.email).then(reviewer => reviewer)


      // If none found: redirect to login
      if (!attendant && !reviewer) {
        req.flash('login message', 'This email doesn\'t correspond to any of the registered users')
        return res.redirect('/login')
      }


      // If attendant or reviewer found: pass infos to session
      if (attendant) {
        req.session.attendant = attendant
        req.session.role = 'attendant'
      }

      if (reviewer) {
        req.session.reviewer = reviewer
        req.session.role = 'reviewer'
      }


      // Redirect to index
      res.redirect('/')
    })
  })
}
