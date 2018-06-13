const mongoose = require('mongoose');


let attendantSchema = mongoose.Schema({
  type: String,
  name: String,
  email: { type: String, unique: true, required: true },
  affiliation: String,
  payment: String,
  grantReq: String
});

attendantSchema.statics.checkExists = function(email) {
  return this.findOne({ email: email }).then(attendant => {
    if (attendant) throw Error('This email is already in use');
  });
};

attendantSchema.statics.findByEmail = function(email, callback) {
  return this.findOne({ email: email }).then(attendant => callback && callback(attendant));
};

module.exports = mongoose.model('Attendant', attendantSchema);
