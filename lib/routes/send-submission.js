const multer = require('multer')
const upload = multer({
  dest: 'lib/files/',
  limits: '100KB'
})

const Author = require('../models').Author;
const Presenter = require('../models').Presenter;

module.exports = (app, isCorrectAttendant) => {
  app.get('/attendant/:email/send-submission', isCorrectAttendant, (req, res) => {
    res.render('send-submission', {
      submission: {},
      attendant: req.session.attendant,
      message: req.flash('send submission message')
    })
  })

  app.post('/attendant/:email/send-submission', isCorrectAttendant, upload.single('attachment'), async (req, res) => {

    let attendant = req.session.attendant

    let author = await Author.create({
      name: attendant.name,
      email: attendant.email,
      affiliation: attendant.affiliation
    }).then(author => author)

    let presenter = await Presenter.create({
      attendant: attendant._id,
      author: author._id
    }).then(presenter => presenter)
    
    res.redirect('/attendant/' + req.params.email)
  })
}
