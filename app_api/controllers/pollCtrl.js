var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

exports.findAllPoll = function(req, res) {
    Poll.find(function(err, polls) {
        if (err) res.send(500, err.message);
        console.log('GET/polls');
        res.status(200).json(polls);
    });
};

exports.findByIdPoll = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    Poll.findById(id, function(err, poll) {
        if (err) res.send(500, err.message);
        console.log('GET/pollId');
        res.status(200).json(poll);
    });
};

exports.addPoll = function(req, res) {
    console.log('POST/poll');
    console.log(req.body);
    var poll = new Poll(req.body);

    poll.save(function(err, poll) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(poll);
    });
};

exports.updatePoll = function(req, res) {
    console.log('PUT/poll');
    console.log(req.body);
    var poll = new Poll(req.body);

    poll.save(function(err, poll) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(poll);
    });
};
