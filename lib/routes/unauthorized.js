module.exports = app => {
  app.get('/unauthorized', (req, res) => {
    res.render('unauthorized')
  })
}
