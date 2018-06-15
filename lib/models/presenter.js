const mongoose = require('mongoose');

// Define the schema for presenters
let presenterSchema = mongoose.Schema({
    author: String,
    attendant: String
});

presenterSchema.statics.checkExists = function() {
  return true
}


module.exports = mongoose.model('Presenter', presenterSchema);
