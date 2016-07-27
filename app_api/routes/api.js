var express = require('express');
var router = express.Router();
var PollCtrl = require('../controllers/pollCtrl');
var UserCtrl = require('../controllers/userCtrl');
var PollResultCtrl = require('../controllers/pollResultCtrl');

router
  .get('/poll',PollCtrl.findAllPoll)
  .get('/poll/:id',PollCtrl.findByIdPoll)
  .get('/poll/owner/:idOwner',PollCtrl.findByOwnerPolls)
  .post('/poll',PollCtrl.addPoll)
  .put('/poll',PollCtrl.updatePoll);

router
  .get('/user',UserCtrl.findAllUsers)
  .post('/user',UserCtrl.addUser)
  .post('/user/log',UserCtrl.login);

  router
    .post('/pollResult',PollResultCtrl.addPollResult);

module.exports = router;
