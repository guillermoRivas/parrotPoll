var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

exports.findAllPoll = function (req, res) {
  Poll.find(function(err, polls) {
    if(err) res.send(500, err.message);
    console.log('GET/polls');
    res.status(200).json(polls);
  });
};


exports.addPoll = function(req, res) {
    console.log('POST');
    console.log(req.body);
    var poll = new Poll(req.body);

    poll.save(function(err, poll) {
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(poll);
    });
};
