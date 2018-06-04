module.exports = (app) => {
    require('./send-submission.js')(app);
    require('./view-submissions.js')(app);
    require('./view-submission-details.js')(app);
    require('./modify-submission.js')(app);

    require('./add-presenter.js')(app);
    require('./add-reviewer.js')(app);
}
