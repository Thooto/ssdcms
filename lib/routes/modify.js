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


// Mongoose imports
let ObjectId = require('mongoose').Types.ObjectId


// Required for those routes
let Submission = require('../models').Submission
let Author = require('../models').Author
let Feedback = require('../models').Feedback


module.exports = (app, isLoggedIn) => {

  // When user requests to see modification page
  app.get('/modify/:id', isLoggedIn, async (req, res) => {

    // We find submission and associated authors
    let submission = await Submission.findById(req.params.id).then(submission => submission)


    // Formatting of the array of author ids into MongoDB ObjectId, then find authors
    let authorIds = Array.from(submission.authors.filter(id => id != ''), id => ObjectId(id))
    let authors = await Author.find({ _id: { $in: authorIds }}).then(authors => authors)


    // Render view
    res.render('modify', { submission: submission, authors:authors})
  })


  // When presenter wants to modify the submission
  app.post('/modify/:id', isLoggedIn, (req, res) => {

    // Method to save file from the form (which requires specific handling because encoded)
    upload(req, res, async (err) => {
      if (err) {

        // If there was an error during file save, throw it
        req.flash('operation message', err.message)
        res.redirect('/operation')
      } else {

        // If everything went fine, update associated submission
        let submission = await Submission.findById(req.params.id).then(submission => submission)
        submission.status = 'sent'


        // If attachment was modified
        if (req.file) submission.attachment = req.file.filename


        // Update content
        submission.title= req.body.title
        submission.abstract= req.body.abstract


        // Update authors
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

        submission.authors = authorIds


        // Update the submission, redirect to details view
        submission.save()
        res.redirect('/details/'+req.params.id)
      }
    })
  })
}
