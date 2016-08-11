var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

exports.countPolls = function(req, res) {
    console.log('GET/polls/count');
    Poll.count({isPublic: true,isDeleted: false}, function(err,count) {
      if (err) res.send(500, err.message);
      res.status(200).json(count);
    });
};

exports.findAllPoll = function(req, res) {

    var pag = (req.query.pag) ? req.query.pag : 0;
    pag = parseInt(pag);
    var skip = (req.query.skip) ? req.query.skip : Number.MAX_SAFE_INTEGER;
    skip = parseInt(skip);

    console.log('GET/polls/' + pag + '/' + skip);

    Poll
        .find({
            isPublic: true,
            published: true,
            isDeleted: false
        })
        .limit(skip)
        .skip((skip * pag))
        .exec(
            function(err, polls) {
                if (err) res.send(500, err.message);
                res.status(200).json(polls);
            }
        );
};

exports.findByIdPoll = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    Poll.findById(id, function(err, poll) {
        if (err) res.send(500, err.message);
        console.log('GET/pollId');
        res.status(200).json(poll);
    });
};

exports.findByOwnerPolls = function(req, res) {
    var owner = mongoose.Types.ObjectId(req.params.idOwner);
    console.log('GET/pollsOwners/' + owner);
    Poll.
    find({
            owner: owner,
            isDeleted: false
        })
        .exec(function(err, polls) {
            if (err) res.send(500, err.message);
            res.status(200).json(polls);
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
    var id = mongoose.Types.ObjectId(req.body._id);
    delete req.body['_id'];

    Poll.findOneAndUpdate({'_id':id},req.body,{upsert:true},function(err, upoll) {
      if (err) return res.status(500).send(err.message);
      res.status(200).json(upoll);
    });
};

exports.deletePoll = function(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
  console.log("Delete/Pol" + id);
  Poll.findByIdAndUpdate(id,
    {
      $set: {isDeleted:true}
    },
    function(err, p) {
      if (err) return res.status(500).send(err.message);
      res.status(200).json(p);
  });
};
