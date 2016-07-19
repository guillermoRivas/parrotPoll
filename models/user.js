var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var uerSchema = new Schema({
  userName: String,
  email: String,
  pass: String
});

module.exports = mongoose.model('User', uerSchema);
