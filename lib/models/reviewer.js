const mongoose = require('mongoose');

// Define the schema for reviewers
let reviewerSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    affiliation: String
});

reviewerSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email })
}

// reviewerSchema.statics.findByEmail = function(email, callback) {
//   return this.findOne({ email: email }).then(reviewer => callback && callback(reviewer));
// };

reviewerSchema.statics.checkExists = function(email) {
  return this.findOne({ email: email }).then(reviewer => {
    if (reviewer) throw Error('This email is already in use');
  });
};


// Export the mongoose model
module.exports = mongoose.model('Reviewer', reviewerSchema);
