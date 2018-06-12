Attendant = require('../models').Attendant;

module.exports = (app, passport) => {
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('login message')});
  });

  // WITHOUT PASSPORT
  // app.post('/login', (req, res) => {
  //   Attendant.findByEmail(req.body.email, (attendant) => {
  //     if (!attendant) {
  //       req.flash('login message', 'This attendant doesn\'t exist');
  //       return res.redirect('/login');
  //     }
  //     req.session.attendant = attendant;
  //     res.redirect('/');
  //   })
  // });

  app.post('/login', (req, res) => {
    passport.authenticate('local-login', function(err, attendant, message) {
      if (err) res.redirect('/', { message: 'Some error happened' });
      if (!attendant) res.redirect('/login');
      if (attendant) {
        req.session.attendant = attendant;
        res.redirect('/');
      }
    })(req, res);
  });
}
