module.exports = (app, passport) => {
  require('./passport.js')(passport);
  require('./app.js')(app, passport);
}
