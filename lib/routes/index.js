module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index');
  });

  require('./send-submission.js')(app);
  require('./view-submissions.js')(app);
  require('./view-submission-details.js')(app);
  require('./modify-submission.js')(app);
  require('./send-requested-changes.js')(app);

  require('./add-presenter.js')(app);
  require('./add-reviewer.js')(app);
}
