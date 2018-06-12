Attendant = require('../models').Attendant;

module.exports = (app, passport) => {
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('login message')});
  });

  app.post('/login', (req, res) => {
    console.log('test');
    passport.authenticate('local-login', function(err, attendant, message) {
      console.log('test');
      if (err) res.redirect('/', { message: 'Some error happened' });
      if (!attendant) res.redirect('/login');
      if (attendant) res.redirect('/attendant/' + attendant.name );
    })(req, res);
  });
}
