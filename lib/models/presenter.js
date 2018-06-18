// Require mongoose as some of its instances will be used
const mongoose = require('mongoose')


// Define the schema for presenters
let presenterSchema = mongoose.Schema({
    author: String,
    attendant: String
})


// Export the new mongoose model
module.exports = mongoose.model('Presenter', presenterSchema)
