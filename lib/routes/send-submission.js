module.exports = (app, isCorrectAttendant) => {
  app.get('/attendant/:email/send-submission', isCorrectAttendant, (req, res) => {
    res.render('send-submission', { attendant: req.session.attendant, message: req.flash('send submission message') })
  })
}
