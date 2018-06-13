Attendant = require('../models').Attendant;

module.exports = app => {
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('login message')});
  });

  app.post('/login', (req, res) => {
    Attendant.findByEmail(req.body.email, (attendant) => {
      if (!attendant) {
        req.flash('login message', 'This attendant doesn\'t exist');
        return res.redirect('/login');
      }
      req.session.attendant = attendant;
      res.redirect('/');
    })
  });
};