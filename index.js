const express = require('express');
const mongoose = require('mongoose');

let app = express();
app.use(express.json());
app.use(express.urlencoded());

require('./lib/config')(app);
require('./lib/routes')(app);

mongoose.connect('mongodb://cmsapp:cmspwd5734@ds159509.mlab.com:59509/cmsdb', (err) => {
    if (err) throw err;
    else console.log('database connected');
});

app.listen(80, (err) => {
    if (err) throw err;
    else console.log('server started');
});
