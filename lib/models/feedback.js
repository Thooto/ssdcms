// Require mongoose as some of its instances will be used
const mongoose = require('mongoose')


// Create feedback schema
let feedbackSchema = mongoose.Schema({
  review: String,
  attachment: String
})


// Export the new mongoose model
module.exports = mongoose.model('Feedback', feedbackSchema)
