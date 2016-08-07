var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var uerResultSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    firstName: String,
    lastName: String,
    age: Number,
    interests: String,
    sex: String,
    country: String,
    region: String,
    town: String,
    zipCode: String
});

var answerResultSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  selected:{
    type: Boolean,
    default:false
  }
});

var questionResultSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  answers: [answerResultSchema]
});

var pollResultSchema = new Schema({
  referencePoll:{
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  isPublic: {
    type: Boolean,
    default: true
  },
  resultIsPublic:{
    type: Boolean,
    default: true
  },
  questions: [questionResultSchema],
  ipResult : String,
  userResult : uerResultSchema,
  creationDate: Date,
  updatedDate: Date
});

pollResultSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updatedDate = currentDate;

  if (!this.creationDate)
    this.creationDate = currentDate;

  next();
});

module.exports = mongoose.model('PollResult', pollResultSchema);
