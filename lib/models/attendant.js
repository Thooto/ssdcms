// Require mongoose as some of its instances will be used
const mongoose = require('mongoose')


// Creation of attendant schema
let attendantSchema = mongoose.Schema({
  type: String,
  name: String,
  email: { type: String, unique: true, required: true },
  affiliation: String,
  payment: String,
  grantReq: String
})


// Creation of static abstraction methods
attendantSchema.statics.checkExists = function(email) {
  return this.findOne({ email: email }).then(attendant => {
    if (attendant) throw Error('This email is already in use')
  })
}

attendantSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email })
}


// Export the new mongoose model
module.exports = mongoose.model('Attendant', attendantSchema)
