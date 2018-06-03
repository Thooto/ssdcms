module.exports = (app) => {
    require('./send-submission.js')(app);
    require('./view-submissions.js')(app);
}
