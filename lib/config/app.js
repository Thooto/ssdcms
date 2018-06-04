module.exports = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded());
    app.set('view cache', false);
    app.set('view engine', 'pug');
    app.set('views', './lib/views');
};
