let Presenter = require('../models').Presenter;

module.exports = (app) => {
    app.get('/add-presenter', (req, res) => {
        Presenter.find((err, presenters) => {
            res.render('add-presenter', { presenters: presenters });
        });
    });

    app.post('/add-presenter', (req, res) => {
        let presenter = new Presenter({
            name: req.body.name,
            email: req.body.email,
            affiliation: req.body.affiliation
        });

        presenter.save((err) => {
            res.redirect('/add-presenter');
        });

    });
};
