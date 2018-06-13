module.exports = (app, passport) => {
  function isCorrectAttendant(req, res, next) {
    let email = null;
    if (req.params) email = req.params.email;
    if (req.body) email = req.body.email;
    if (req.session.attendant && req.session.attendant.email == email) return next();
    res.redirect('/unauthorized');
  }

  app.get('/', (req, res) => {
    res.render('index', { attendant: req.session.attendant });
  });

  require('./attendant.js')(app, isCorrectAttendant);

  require('./login.js')(app);
  require('./logout.js')(app);
  require('./unauthorized.js')(app);

  require('./assign-reviewer.js')(app);
  require('./register-attendant.js')(app);
}
