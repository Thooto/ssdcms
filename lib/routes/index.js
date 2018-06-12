module.exports = (app, passport) => {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect(req.header('Referer'));
  }

  app.get('/', (req, res) => {
    res.render('index', { attendant: req.session.attendant });
  });

  require('./register.js')(app);
  require('./login.js')(app, passport);

  require('./send-submission.js')(app);
  require('./view-submissions.js')(app);
  require('./view-submission-details.js')(app);
  require('./modify-submission.js')(app);
  require('./send-requested-changes.js')(app);

  require('./add-presenter.js')(app);
  require('./add-reviewer.js')(app);
}
