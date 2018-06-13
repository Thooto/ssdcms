module.exports = (app, passport) => {
  function isLoggedIn(req, res, next) {
    if (req.session.attendant) return next();
    res.redirect('/login')
  }

  app.get('/', (req, res) => {
    res.render('index', { attendant: req.session.attendant });
  });

  require('./attendant.js')(app, isLoggedIn);
  require('./send-submission.js')(app, isLoggedIn);

  require('./login.js')(app);
  require('./logout.js')(app);

  require('./assign-reviewer.js')(app);
  require('./register-attendant.js')(app);

  app.get('/operation', (req, res) => {
    res.render('operation', { message: req.flash('operation message'), attendant: true });
  });
}
