const mongoose = require('mongoose')

let authorSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  affiliation: String
})

module.exports = mongoose.model('Author', authorSchema)