module.exports = (app, isCorrectAttendant) => {
  app.get('/attendant/:email', isCorrectAttendant, (req, res) => {
    res.render('attendant', { attendant: req.session.attendant });
  });
};
