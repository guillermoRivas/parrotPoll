var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uerSchema = new Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordSalt: {
        type: String,
        required: true,
        select: false
    },
    creationDate: Date,
    updatedDate: Date
});

uerSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updatedDate = currentDate;
  if (!this.creationDate)
    this.creationDate = currentDate;
  next();
});

module.exports = mongoose.model('User', uerSchema);
