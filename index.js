// Require express, http server framework
const express = require('express');
// Require mongoose, mongodb framework
const mongoose = require('mongoose');

// App initialisation
const app = express();

// App configuration
require('./lib/config')(app, express);

// App routes setup
require('./lib/routes')(app);

// Connect to the database with mongoose
mongoose.connect('mongodb://cmsapp:cmspwd5734@ds159509.mlab.com:59509/cmsdb', (err) => {
    if (err) throw err;
    console.log('database connected');
});

// Start the server on port 80
app.listen(80, (err) => {
    if (err) throw err;
    console.log('server started');
});
