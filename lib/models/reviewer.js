// Require mongoose as some of its instances will be used
const mongoose = require('mongoose')


// Define the schema for reviewers
let reviewerSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    affiliation: String
})


// Static abstraction methods definition
reviewerSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email })
}

reviewerSchema.statics.checkExists = function(email) {
  return this.findOne({ email: email }).then(reviewer => {
    if (reviewer) throw Error('This email is already in use')
  })
}


// Export the mongoose model
module.exports = mongoose.model('Reviewer', reviewerSchema)
