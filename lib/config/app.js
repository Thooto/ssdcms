module.exports = (app) => {
    app.set('view cache', false);
    app.set('view engine', 'pug');
    // app.set('view engine', 'ejs');
    app.set('views', './lib/views');
};
