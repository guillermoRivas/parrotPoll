var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var answerSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

var questionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  answers: [answerSchema]
});

var pollSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  owner: [{type:Schema.Types.ObjectId}],
  ispublic: {
    type: Boolean,
    default: true
  },
  resultIsPublic:{
    type: Boolean,
    default: true
  },
  questions: [questionSchema],
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
