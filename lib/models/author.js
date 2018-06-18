// Require mongoose as some of its instances will be used
const mongoose = require('mongoose')

// Creation of author schema
let authorSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  affiliation: String
})

// Export the new mongoose model
module.exports = mongoose.model('Author', authorSchema)
