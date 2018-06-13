module.exports = (app, passport) => {

  // WITH PASSPORT
  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) return next();
  //   res.redirect('/');
  // }

  function isCorrectAttendant(req, res, next) {
    console.log(req.params.id);
    if (req.session.attendant._id == req.params.id) return next();
    res.redirect('/');
  }

  app.get('/', (req, res) => {
    res.render('index', { attendant: req.session.attendant });
  });

  require('./attendant.js')(app, isCorrectAttendant); // isLoggedIn, isCorrectAttendant);

  require('./register.js')(app);
  require('./login.js')(app); // , passport);
  require('./logout.js')(app);

  require('./send-submission.js')(app);
  require('./view-submissions.js')(app);
  require('./view-submission-details.js')(app);
  require('./modify-submission.js')(app);
  require('./send-requested-changes.js')(app);

  require('./add-presenter.js')(app);
  require('./add-reviewer.js')(app);
}
