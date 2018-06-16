module.exports = (app, isLoggedIn) => {
  app.get('/attendant', isLoggedIn, (req, res) => {
    if (req.session.attendant) res.render('attendant', { attendant: req.session.attendant })
    if (req.session.reviewer) res.render('attendant', { attendant: req.session.reviewer })
  })
}
