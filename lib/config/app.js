module.exports = (app, express) => {
    // For post requests, stores data in req.body
    app.use(express.json());
    app.use(express.urlencoded());

    // To set the view templater (pug) and avoid caching views
    app.set('view cache', false);
    app.set('view engine', 'pug');

    // Views directory
    app.set('views', './lib/views');
};
