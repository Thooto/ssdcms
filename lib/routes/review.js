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




let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Feedback = require('../models').Feedback;

module.exports = (app, isLoggedIn) => {
  app.post('/review/:id', isLoggedIn, (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.log('test')
        req.flash('operation message', err.message)
        res.redirect('/operation')

      } else {
        submission = await Submission.findById(req.params.id).then(submission => submission)
        submission.status = req.body.status;

        if (submission.feedback != '')
        Feedback.findByIdAndRemove(submission.feedback,(err)=>{});

        let feedback = await Feedback.create({
          review: req.body.review,
          attachment: req.file ? req.file.filename : ''
        }).then(feedback => feedback)

        submission.feedback = feedback._id;
        submission.save();

        res.redirect('/details/'+req.params.id);

      }
    })
  })
}
