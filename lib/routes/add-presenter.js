let Presenter = require('../models').Presenter;

module.exports = (app) => {
    // When the manager requires the add-presenter view
    app.get('/add-presenter', (req, res) => {
        // List all presenters in the database and call view renderer
        Presenter.find((err, presenters) => {
            res.render('add-presenter', { presenters: presenters });
        });
    });

    // When the manager adds a new presenter
    app.post('/add-presenter', (req, res) => {
        // Declare a new instance of the presenter model
        let presenter = new Presenter({
            name: req.body.name,
            email: req.body.email,
            affiliation: req.body.affiliation
        });

        // Save to the database and redirect manager
        presenter.save((err) => {
            res.redirect('/add-presenter');
        });

    });
};
