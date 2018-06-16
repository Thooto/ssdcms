let Presenter = require('../models').Presenter;
let Submission = require('../models').Submission;

function isLoggedIn(req, res, next) {
  if (req.session.attendant || req.session.reviewer) return next();
  res.redirect('/login')
}

module.exports = (app, passport) => {

  app.get('/', isLoggedIn, (req, res) => {
    if (req.session.attendant)
      Presenter.findOne({attendant:req.session.attendant._id},(err, presenter) => {
        Submission.find({presenter:presenter._id},(err, submissions) => {
          return res.render('index', {attendant: req.session.attendant, submissions:submissions});
        })
      })

    if (req.session.reviewer)
      Submission.find({reviewer: req.session.reviewer._id}, (err, submissions) => {
        return res.render('index', {attendant: req.session.reviewer, submissions: submissions});
      })

  });

  require('./attendant.js')(app, isLoggedIn);
  require('./send-submission.js')(app, isLoggedIn);
  require('./details.js')(app, isLoggedIn);
  require('./modify.js')(app, isLoggedIn);
  require('./review.js')(app, isLoggedIn);

  require('./login.js')(app);
  require('./logout.js')(app);

  require('./assign-reviewer.js')(app);
  require('./register-reviewer.js')(app);
  require('./register-attendant.js')(app);

  app.get('/operation', (req, res) => {
    res.render('operation', { message: req.flash('operation message'), attendant: true });
  });
}
