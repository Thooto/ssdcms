module.exports = (app, passport) => {
  function isCorrectAttendant(req, res, next) {
    if (req.session.attendant && req.session.attendant.email == req.params.email) return next();
    res.redirect('/unauthorized');
  }

  app.get('/', (req, res) => {
    res.render('index', { attendant: req.session.attendant });
  });

  require('./attendant.js')(app, isCorrectAttendant);
  require('./unauthorized.js')(app);

  require('./register.js')(app);
  require('./login.js')(app);
  require('./logout.js')(app);

  require('./send-submission.js')(app);
  require('./view-submissions.js')(app);
  require('./view-submission-details.js')(app);
  require('./modify-submission.js')(app);
  require('./send-requested-changes.js')(app);

  require('./add-presenter.js')(app);
  require('./add-reviewer.js')(app);
}
