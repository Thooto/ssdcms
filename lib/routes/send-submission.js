// Requirements for attachment storage
const multer = require('multer')
const randomstring = require('randomstring')

// Define how the attachments should be stored
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    // Generate a random name to make sure no duplicate is possible
    cb(null, randomstring.generate(7) + ' ' + file.originalname)
  }
})

// To restrict the upload of files if not pdf
let fileFilter = function(req, file, cb) {
  if (file.mimetype == 'application/pdf')
    cb(null, true)
  else cb(new Error('File extension must be pdf'))
}

// Define storing module, with limit of 5MB per file
let upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
}).single('attachment')

// Required for those routes
const Author = require('../models').Author
const Presenter = require('../models').Presenter
const Submission = require('../models').Submission
const Feedback = require('../models').Feedback

module.exports = (app, isLoggedIn) => {
  // When the attendant wants to send a submission
  app.get('/send-submission', isLoggedIn, (req, res) => {
    res.render('send-submission', {
      submission: {},
      attendant: req.session.attendant,
      message: req.flash('send submission message')
    })
  })

  // When the attendant has sent his submission
  app.post('/send-submission', isLoggedIn, (req, res) => {
    // Method to save file from the form (which requires specific handling because encoded)
    upload(req, res, async (err) => {
      if (err) {
        // If errors while file saving, tell attendant
        req.flash('operation message', err.message)
        res.redirect('/operation')
      } else {
        // If everything went fine
        // Temporary variables
        let attendant = req.session.attendant
        let presenter, author

        // NOTE Next 20 lines are necessary to avoid duplicates in database

        // Find if the attendant was already registered as presenter
        presenter = await Presenter.findOne({ attendant: attendant._id }).then(presenter => presenter)

        // If so, find his associated author account
        if (presenter) {
          author = await Author.findById(presenter.author).then(author => author)
        } else {
          // If not, find if he already exists as an author
          author = await Author.findOne({ email: attendant.email }).then(author => author)

          // If it doesn't exist, create it
          if (!author) author = await Author.create({
            email: attendant.email,
            name: attendant.name,
            affiliation: attendant.affiliation
          }).then(author => author)

          // Then create the presenter
          presenter = await Presenter.create({
            attendant: attendant._id,
            author: author._id
          }).then(presenter => presenter)
        }

        // Create associated authors of the submission
        let authors = []
        let authorIds = []

        if (req.body.authors) {
          // If one or no authors were provided, format it to an array for next functions
          if (req.body.authors.names.constructor !== Array) {
            req.body.authors.names = [req.body.authors.names]
            req.body.authors.emails = [req.body.authors.emails]
            req.body.authors.affiliations = [req.body.authors.affiliations]
          }

          // Skip already existing authors, else add them to a list
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

        /*
        Authors.create(authors) will populate the database with new authors
        .then() will fire after authors have been created
        Array.from() will create an array of those ids
        authorIds.push(...) will add those ids to existing authorIds
        ... is an operator that turns an iterable into multiple items:
        [1,2,3] becomes 1, 2, 3
        */
        if (authors.length > 0)
        authorIds.push(...await Author.create(authors).then(authors => Array.from(authors, author => author._id)))

        // Create feedback
        let feedback = await Feedback.create({
          review: '',
          attachment: ''
        }).then(feedback => feedback)

        // Create submission eventually
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

        // Redirect attendant to success view page
        req.flash('operation message', 'Submission successfully sent')
        res.redirect('/operation')
      }
    })
  })
}
