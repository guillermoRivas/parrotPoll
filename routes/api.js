var express = require('express');
var router = express.Router();
var PollCtrl = require('../controllers/pollCtrl');

router.get('/poll',PollCtrl.findAllPoll).post('/poll',PollCtrl.addPoll);
router.get('/user',PollCtrl.findAllPoll).post('/user',PollCtrl.addPoll);

module.exports = router;
