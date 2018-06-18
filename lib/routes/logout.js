Attendant = require('../models').Attendant

module.exports = (app) => {

  // When a user requests to log out
  app.get('/logout', (req, res) => {

    // We destroy the session to make sure no information is kept
    req.session.destroy()
    res.redirect('/')
  })
}
