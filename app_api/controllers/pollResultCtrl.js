var mongoose = require('mongoose');
var PollResult = mongoose.model('PollResult');

exports.addPollResult = function(req, res) {
    console.log('POST/poll');
    console.log(req.body);
    var pollResult = new PollResult(req.body);
    pollResult.save(function(err, pollr) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(pollr);
    });
};
