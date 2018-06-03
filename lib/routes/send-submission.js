let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Presenter = require('../models').Presenter;

module.exports = (app) => {
    app.get('/send-submission', (req, res) => {
        res.render('send-submission');
    });

    app.post('/send-submission', (req, res) => {
        Presenter.findOne({ email: req.body.email }, (err, presenter) => {
            let authors = [];

            for (let author of req.body.authors.split(', ')) {
                authors.push({
                    name: author,
                    email: 'fake@email.com',
                    affiliation: 'random.co'
                });
            }

            Author.create(authors, (err, authors) => {
                let submission = new Submission({
                    title: req.body.title,
                    abstract: req.body.abstract,
                    authors: Array.from(authors, (author) => author._id),
                    presenter: presenter._id
                });

                submission.save((err) => {
                    res.redirect('/view-submissions?email=' + presenter.email);
                });
            });
        });
    });
};
