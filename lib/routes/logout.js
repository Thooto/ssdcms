Attendant = require('../models').Attendant;

module.exports = (app) => {
  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
}
