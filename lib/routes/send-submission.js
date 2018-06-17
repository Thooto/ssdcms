const multer = require('multer')
const randomstring = require('randomstring')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    cb(null, randomstring.generate(7) + ' ' + file.originalname)
  }
})

let fileFilter = function(req, file, cb) {
  if (file.mimetype == 'application/pdf')
    cb(null, true)
  else cb(new Error('File extension must be pdf'))
}

let upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
}).single('attachment')



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

  app.post('/send-submission', isLoggedIn, (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.log('test')
        req.flash('operation message', err.message)
        res.redirect('/operation')

      } else {

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
        let authorIds = []

        if (req.body.authors) {
          if (req.body.authors.names.constructor !== Array) {
            req.body.authors.names = [req.body.authors.names]
            req.body.authors.emails = [req.body.authors.emails]
            req.body.authors.affiliations = [req.body.authors.affiliations]
          }

          for ([i, email] of req.body.authors.emails.entries()) {
            let author = await Author.findOne({ email: email }).then(author => author)

            if (author) authorIds.push(author._id)
            else authors.push({
              name: req.body.authors.names[i],
              email: email,
              affiliation: req.body.authors.affiliations[i]
            })
          }
        }

        if (authors.length > 0)
        authorIds.push(...await Author.create(authors).then(authors => Array.from(authors, author => author._id)))

        let feedback = await Feedback.create({
          review: '',
          attachment: ''
        }).then(feedback => feedback)

        let submission = await Submission.create({
          status: 'sent',
          title: req.body.title,
          abstract: req.body.abstract,
          presenter: presenter._id,
          authors: authorIds,
          attachment: req.file.filename,
          reviewer: '',
          feedback: feedback._id,
          type: req.body.type
        }).then(submission => submission)


        req.flash('operation message', 'Submission successfully sent')
        res.redirect('/operation')
      }
    })
  })
}
