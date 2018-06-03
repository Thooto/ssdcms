module.exports = (app) => {
    app.get('/view-submissions', (req, res) => {
        Submission.find((err, submissions) => {
            res.render('view-submissions.ejs', { submissions: submissions });
        });
    });
};
