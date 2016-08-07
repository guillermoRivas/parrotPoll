var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var invitationSchema = new Schema({
  forRef: Schema.Types.ObjectId,
  fromRef: Schema.Types.ObjectId,
  fromName: String,
  pollRef: Schema.Types.ObjectId,
  pollText: String,
  isActive:{
    type: Boolean,
    default: true
  },
  creationDate: Date,
  updatedDate: Date
});

invitationSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updatedDate = currentDate;

  if (!this.creationDate)
    this.creationDate = currentDate;

  next();
});

module.exports = mongoose.model('Invitation', invitationSchema);
