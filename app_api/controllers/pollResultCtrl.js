var mongoose = require('mongoose');
var PollResult = mongoose.model('PollResult');

exports.addPollResult = function(req, res) {
    console.log('POST/resultPoll');
    console.log(req.body);
    var pollResult = new PollResult(req.body);

    pollResult.save(function(err, pollr) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(pollr);
    });
};

exports.getResultsPoll = function(req, res) {
    console.log('Get/resultPoll');
    var idPoll = mongoose.Types.ObjectId(req.params.id);
    PollResult.aggregate([{
        $match: {
            referencePoll: idPoll
        }
    }, {
        $project: {
            questions: 1
        }
    }, {
        $unwind: "$questions"
    }, {
        $unwind: "$questions.answers"
    }, {
        $group: {
            _id: {
                questionId: "$questions.text",
                answerId: "$questions.answers.text"
            },
            count: {
                $sum: {
                    $cond: ["$questions.answers.selected", 1, 0]
                }
            }
        }
    }, {
        $project: {
            _id: 0,
            questionId: "$_id.questionId",
            answerId: "$_id.answerId",
            total: "$count"
        }
    }, {
        $group: {
            _id: "$questionId",
            answers: {
                $push: {
                    answer: "$answerId",
                    total: "$total"
                }
            }
        }
    }]).exec(function(err, result) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(result);
    });
};

exports.countResutlsPoll = function(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
    console.log('GET/ResultsPoll/count');

    PollResult.count({referencePoll: id}, function(err,count) {
      if (err) res.send(500, err.message);
      res.status(200).json(count);
    });
};

exports.getRepPollResultsCountry = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log('GET/pollResult/getRepPollResultsCountry');

    PollResult.aggregate([
      {
        $match: { referencePoll: id }
    },
      {$group :
          {_id: "$locationResult.country",
          nResults:{ $sum: 1 }
          }
          },
    { $sort : { nresults : -1} },
    { $limit: 10 }
  ]).exec(function(err, result) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(result);
    });
};

exports.getRepPollResultsTime = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log('GET/getRepPollResultsTime');

    PollResult.aggregate([
          {
              $match: { referencePoll: id}
            },
            {$project: {_id:1, year: { $year: "$creationDate" },
               month: { $month: "$creationDate" },
               day: { $dayOfMonth: "$creationDate" } }},

               {$group: {_id: {year:'$year', day:'$day', month:'$month'}, nresults: { "$sum": 1 } }},
               {$project: {_id:1, nresults:1, time: { $concat: [ {$substr: [ "$_id.year", 0, 4 ]}, "-", {$substr: [ '$_id.month', 0, 2 ]}, "-", {$substr: [ '$_id.day', 0, 2 ]} ] }} },
               { $sort : { time : 1 } }
      ]).exec(function(err, result) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(result);
    });
};
