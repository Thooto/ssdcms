module.exports = (app, express) => {
    app.set('view cache', false);
    app.set('view engine', 'pug');
    app.set('views', './lib/views');
};
