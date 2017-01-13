var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var uerResultSchema = new Schema({
    _id: Schema.Types.ObjectId,
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

var locationResultSchema = new Schema({
  ip: String,
  country: String,
  region: String,
  city: String
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
  locationResult : locationResultSchema,
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
