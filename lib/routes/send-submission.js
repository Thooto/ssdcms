const multer = require('multer')
const upload = multer({
  dest: 'lib/files/',
  limits: '100KB'
})

const Author = require('../models').Author
const Presenter = require('../models').Presenter
const Submission = require('../models').Submission
const Feedback = require('../models').Feedback

module.exports = (app, isLoggedIn) => {
  app.get('/send-submission', isLoggedIn, (req, res) => {
    res.render('send-submission', {
      submission: {},
      attendant: req.session.attendant,
      message: req.flash('send submission message')
    })
  })

  app.post('/send-submission', isLoggedIn, upload.single('attachment'), async (req, res) => {

    let attendant = req.session.attendant
    let presenter, author

    presenter = await Presenter.findOne({ attendant: attendant._id }).then(presenter => presenter)

    if (presenter) {
      author = await Author.findById(presenter.author).then(author => author)
    } else {
      author = await Author.findOne({ email: attendant.email }).then(author => author)

      if (!author) author = await Author.create({
        email: attendant.email,
        name: attendant.name,
        affiliation: attendant.affiliation
      }).then(author => author)

      presenter = await Presenter.create({
        attendant: attendant._id,
        author: author._id
      }).then(presenter => presenter)
    }

    let authors = []

    for (let i = 0; i < req.body.authors.names.length; i++) {
      authors.push({
        name: req.body.authors.names[i],
        email: req.body.authors.emails[i],
        affiliation: req.body.authors.affiliations[i]
      })
    }

    let authorIds = await Author.create(authors).then(authors => Array.from(authors, author => author._id))

    let submission = await Submission.create({
      title: req.body.title,
      abstract: req.body.abstract,
      presenter: presenter._id,
      authors: authorIds,
      attachment: req.file.filename,
      reviewer: 'not provided yet',
      feedback: 'not provided yet'
    }).then(submission => submission)

    let feedback = await Feedback.create({
      review: 'empty',
      attachment: 'empty',
      submission: submission._id
    })

    submission.feedback = feedback._id
    submission.save()

    req.flash('operation message', 'Submission successfully sent')
    res.redirect('/operation')
  })
}
