const LocalStrategy = require('passport-local').Strategy;
const Attendant = require('../models').Attendant;

module.exports = (passport) => {

  passport.serializeUser(function(attendant, done) {
    done(null, attendant.id);
  });

  passport.deserializeUser(function(id, done) {
    Attendant.findById(id, function(err, attendant) {
      done(err, attendant);
    });
  });


  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'email',
    passReqToCallback: true
  }, function(req, email, _, done) {
    process.nextTick(function() {
      Attendant.findByEmail(email, function(attendant) {
        if (!attendant) {
          return done(null, false, req.flash('login message', 'This attendant doesn\'t exist'));
        }

        return done(null, attendant);
      });
    });
  }));
};
