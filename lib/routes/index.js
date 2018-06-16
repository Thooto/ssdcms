let Presenter = require('../models').Presenter;
let Submission = require('../models').Submission;

module.exports = (app, passport) => {
  function isLoggedIn(req, res, next) {
    if (req.session.attendant) return next();
    res.redirect('/login')
  }

  app.get('/', isLoggedIn,(req, res) => {
   Presenter.findOne({attendant:req.session.attendant._id},(err, presenter) => {
      Submission.find({presenter:presenter._id},(err, submissions) => {
        res.render('index', {attendant: req.session.attendant, submissions:submissions});
      });
    });
    
    //submissions = Submission.findByPresenter(presenter);
    
  });

  require('./attendant.js')(app, isLoggedIn);
  require('./send-submission.js')(app, isLoggedIn);
  require('./details.js')(app, isLoggedIn);
  require('./modify.js')(app, isLoggedIn);

  require('./login.js')(app);
  require('./logout.js')(app);

  require('./assign-reviewer.js')(app);
  require('./register-reviewer.js')(app);
  require('./register-attendant.js')(app);

  app.get('/operation', (req, res) => {
    res.render('operation', { message: req.flash('operation message'), attendant: true });
  });
}
