let Submission = require('../models').Submission;
let Author = require('../models').Author;

module.exports = (app) => {

    app.get('/send-submission', (req, res) => {
        res.render('send-submission.ejs');
    });

    app.post('/send-submission', (req, res) => {
        let newSubmission = new Submission({
            title: 'Little title',
            abstract: 'Big abstract',
            authors: ['test', 'tt']
        });


        newSubmission.save();
        res.redirect('/view-submissions');
    });
};
