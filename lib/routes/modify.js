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







let ObjectId = require('mongoose').Types.ObjectId

let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.get('/modify/:id', isLoggedIn, async (req, res) => {
    let submission = await Submission.findById(req.params.id).then(submission => submission);
    let authorIds = Array.from(submission.authors.filter(id => id != ''), id => ObjectId(id));
    let authors = await Author.find({ _id: { $in: authorIds }}).then(authors => authors);
    res.render('modify', { submission: submission, authors:authors});
  });

  app.post('/modify/:id', isLoggedIn, (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        req.flash('operation message', err.message)
        res.redirect('/operation')
      } else {
        let submission = await Submission.findById(req.params.id).then(submission => submission);
        submission.status = 'sent';
        if (req.file) submission.attachment = req.file.filename;

        submission.title= req.body.title;
        submission.abstract= req.body.abstract;


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

        submission.authors = authorIds

        submission.save();
        res.redirect('/details/'+req.params.id);
      }
    })
  });
}
