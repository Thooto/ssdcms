const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');

const app = express();
require('./lib/config')(app); //, passport);
require('./lib/routes')(app); //, passport);

app.use(express.static('lib/assets'));


mongoose.connect('mongodb://cmsapp:cmspwd5734@ds159509.mlab.com:59509/cmsdb', (err) => {
    if (err) throw err;
    console.log('database connected');
});


app.listen(8080, (err) => {
    if (err) throw err;
    console.log('server started');
});
