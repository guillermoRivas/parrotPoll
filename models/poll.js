var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pollSchema = new Schema({
  name: String,
  description: String,
  creationDate: Date
});

module.exports = mongoose.model('Poll', pollSchema);
