module.exports = (app, isLoggedIn) => {
  app.get('/attendant', isLoggedIn, (req, res) => {
    res.render('attendant', { attendant: req.session.attendant })
  })
}
