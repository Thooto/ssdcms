module.exports = (app, isCorrectAttendant) => { // isLoggedIn, isCorrectAttendant) => {
  app.get('/attendant/:email', isCorrectAttendant, (req, res) => { // isLoggedIn, isCorrectAttendant, (req, res) => {
    res.render('attendant', { attendant: req.session.attendant });
  });
};
