/**
 * Module dependencies.
 */

var express = require('express');
var router = express.Router();
var PollCtrl = require('../controllers/pollCtrl');
var UserCtrl = require('../controllers/userCtrl');
var PollResultCtrl = require('../controllers/pollResultCtrl');
var auth = require('../controllers/auth/auth');
var middleware = require('../controllers/auth/authMiddleware');
var InvitationCtrl = require('../controllers/invitationCtrl');

/**
 *  PollCtrl.
 */

router
    .get('/poll', PollCtrl.findAllPoll)
    .get('/poll/count', PollCtrl.countPolls)
    .get('/poll/:id', PollCtrl.findByIdPoll)
    .get('/poll/owner/:idOwner', PollCtrl.findByOwnerPolls)
    .post('/poll', PollCtrl.addPoll)
    .put('/poll', PollCtrl.updatePoll)
    .delete('/poll/:id', PollCtrl.deletePoll);

/**
 *  UserCtrl.
 */

router
    .get('/user', UserCtrl.findAllUsers)
    .get('/user/names/:name', UserCtrl.findByUsersNameRegex)
    .get('/user/exist/:userName', UserCtrl.exixtUserByUserName)
    .get('/user/existEmail/:email', UserCtrl.exixtUserByEmail)
    .post('/user', UserCtrl.addUser)
    .put('/user', UserCtrl.updateUser)
    .post('/user/log', UserCtrl.login);

/**
 *  Estadisticas.
 */
router
    .get('/pollResults/:id', PollResultCtrl.getResultsPoll)
    .get('/pollResultsCount/:id', PollResultCtrl.countResutlsPoll)
    .post('/pollResult', PollResultCtrl.addPollResult)
    .get('/repPollResultsCountry/:id', PollResultCtrl.getRepPollResultsCountry)
    .get('/repPollResults/:id', PollCtrl.getRepPollResults)
    .get('/repPollResultsTime/:id', PollResultCtrl.getRepPollResultsTime);

/**
 *  auth.
 */

router
    .post('/auth/singup', auth.signup)
    .post('/auth/login', auth.login)
    .get('/auth/user', middleware.ensureAuthenticated, auth.getActualUser);

/**
 *  InvitationCtrl.
 */
router
    .get('/invitation/:id', InvitationCtrl.findByForInvitation)
    .post('/invitation/', InvitationCtrl.addInvitation)
    .delete('/invitation/:id', InvitationCtrl.deleteInvitation);

module.exports = router;
