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
let Submission = require('../models').Submission
let Author = require('../models').Author
let Feedback = require('../models').Feedback

module.exports = (app, isLoggedIn) => {
  // When reviewer sends the review
  app.post('/review/:id', isLoggedIn, (req, res) => {
    // Method to save file from the form (which requires specific handling because encoded)
    upload(req, res, async (err) => {
      if (err) {
        // If there was an error during file save, tell user
        console.log('test')
        req.flash('operation message', err.message)
        res.redirect('/operation')
      } else {
        // If everything went fine, find associated submission and update status
        submission = await Submission.findById(req.params.id).then(submission => submission)
        submission.status = req.body.status

        // Delete previous feedback
        if (submission.feedback != '')
        Feedback.findByIdAndRemove(submission.feedback,(err)=>{})

        // Create new feedback
        let feedback = await Feedback.create({
          review: req.body.review,
          attachment: req.file ? req.file.filename : ''
        }).then(feedback => feedback)

        // Update submission and save
        submission.feedback = feedback._id
        submission.save()

        // Redirect reviewer
        res.redirect('/details/'+req.params.id)
      }
    })
  })
}
