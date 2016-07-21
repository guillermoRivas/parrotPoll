var express = require('express');
var router = express.Router();
var PollCtrl = require('../controllers/pollCtrl');
var UserCtrl = require('../controllers/userCtrl');

router
  .get('/poll',PollCtrl.findAllPoll)
  .get('/poll/:id',PollCtrl.findByIdPoll)
  .post('/poll',PollCtrl.addPoll)
  .put('/poll',PollCtrl.updatePoll);

router
  .get('/user',UserCtrl.findAllUsers)
  .post('/user',UserCtrl.addUser);

module.exports = router;
