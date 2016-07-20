var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pollSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  creationDate: Date,
  updatedDate: Date
});

pollSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updatedDate = currentDate;

  if (!this.creationDate)
    this.creationDate = currentDate;

  next();
});

module.exports = mongoose.model('Poll', pollSchema);
