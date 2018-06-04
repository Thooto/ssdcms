let Submission = require('../models').Submission;
let Author = require('../models').Author;
let Presenter = require('../models').Presenter;

module.exports = (app) => {
    // When a presenter requires to send a submission
    app.get('/send-submission', (req, res) => {
        res.render('send-submission');
    });

    // When the presenter has clicked send submission
    app.post('/send-submission', (req, res) => {
        // Find the presenter by email to get his details
        Presenter.findOne({ email: req.body.email }, (err, presenter) => {
            // Create the list of authors from the input
            let authors = [];

            for (let author of req.body.authors.split(', ')) {
                authors.push({
                    name: author,
                    email: 'fake@email.com',
                    affiliation: 'random.co'
                });
            }

            // Save these authors to the database
            Author.create(authors, (err, authors) => {
                // Once the presenter and authors are created/found, create the new submission
                let submission = new Submission({
                    title: req.body.title,
                    abstract: req.body.abstract,
                    authors: Array.from(authors, (author) => author._id),
                    presenter: presenter._id
                });

                // Save the new instance and render view
                submission.save((err) => {
                    res.redirect('/view-submissions?email=' + presenter.email);
                });
            });
        });
    });
};
