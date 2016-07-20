var express = require('express');
var router = express.Router();
var PollCtrl = require('../controllers/pollCtrl');

router
  .get('/poll',PollCtrl.findAllPoll)
  .get('/poll/:id',PollCtrl.findByIdPoll)
  .post('/poll',PollCtrl.addPoll)
  .put('/poll',PollCtrl.updatePoll);

//router.get('/user',PollCtrl.findAllPoll).post('/user',PollCtrl.addPoll);

module.exports = router;
