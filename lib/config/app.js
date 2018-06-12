const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

module.exports = (app, passport) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use(session({
    secret: 'ssdcmspassword531',
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


  app.set('view cache', false);
  app.set('view engine', 'pug');


  app.set('views', './lib/views');
};
