module.exports = (app, isLoggedIn, isCorrectAttendant) => {
  app.get('/attendant/:id', isLoggedIn, isCorrectAttendant, (req, res) => {
    res.render('attendant', { attendant: req.session.attendant });
  });
};
