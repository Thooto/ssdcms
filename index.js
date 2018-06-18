// Root file, started by node

/* NOTE
Async functions: in some routes we used asynchronous functions.
rather than making waterfalls of callbacks, we use the node
asynchronous capabilities through async and await keywords.
"async" will declare that the given function is asynchronous,
"await" will make the app wait for the result of the callback, rather than
continuing to run the code while the callback is running asynchronously
*/


// Require express and mongoose
const express = require('express')
const mongoose = require('mongoose')


// Creating and configuring the application
const app = express()
require('./lib/config')(app)
require('./lib/routes')(app)


// Connect the server to the database server
mongoose.connect('mongodb://cmsapp:cmspwd5734@ds159509.mlab.com:59509/cmsdb', (err) => {
    if (err) throw err
    console.log('database connected')
})


// Start the server on port 80(80)
app.listen(8080, (err) => {
    if (err) throw err
    console.log('server started')
})
