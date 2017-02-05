angular.module('parrotPollApp')
    .factory('dataFactory', ['$http', function($http) {

    var pollUrlBase = 'api/poll/';
    var userUrlBase ='api/user';
    var invitacionesUrlBase = 'api/invitation/';
    var authGetUserUrl ='api/auth/user';
    var pollResultsCountUrl ='api/pollResultsCount/';
    var pollResultsURL = 'api/pollResults/';
    var postPollResultUrl = 'api/pollResult';
    var userExistNameUrl = 'api/user/exist/';
    var userExistEmailUrl = 'api/user/existEmail/';
    var getUserNameURL = "api/user/names/";
    var getPollsOwnerURL = 'api/poll/owner/';
    var reportResultsURL = 'api/repPollResults/';
    var reportPollResultsCountryURL = 'api/repPollResultsCountry/';
    var reportPollResultsTimeURL = 'api/repPollResultsTime/';

    var dataFactoryInterface = {};

    dataFactoryInterface.getCountPolls = function () {
        return $http.get(pollUrlBase + "count");
    };

    dataFactoryInterface.getPolls = function (limit, skip) {
       return $http.get( pollUrlBase + "?pag=" + limit + "&skip=" + skip);
    };

    dataFactoryInterface.getInvitaciones = function (idUser) {
       return $http.get(invitacionesUrlBase + idUser);
    };

    dataFactoryInterface.deleteInvitaciones = function (idInvitacion) {
       return $http.delete(invitacionesUrlBase + idInvitacion);
    };

    dataFactoryInterface.getUser = function () {
       return $http.get(authGetUserUrl);
    };

    dataFactoryInterface.getResultsCount = function (reference) {
       return $http.get(pollResultsCountUrl + reference);
    };

    dataFactoryInterface.getResults = function (reference) {
       return $http.get(pollResultsURL + reference);
    };

    dataFactoryInterface.postPollResult = function (poll) {
       return $http.post(postPollResultUrl, poll);
    };

    dataFactoryInterface.getPoll = function (idPoll) {
       return $http.get(pollUrlBase + idPoll);
    };

    dataFactoryInterface.getUserExistUserName = function (userName) {
       return $http.get(userExistNameUrl + userName);
    };

    dataFactoryInterface.getUserExistUserEmail = function (email) {
       return $http.get(userExistEmailUrl + email);
    };

    dataFactoryInterface.putPoll = function (poll) {
       return $http.put(pollUrlBase, poll);
    };

    dataFactoryInterface.getUserByName = function (name) {
       return $http.get(getUserNameURL+ name);
    };

    dataFactoryInterface.deletePoll = function (pollId) {
       return $http.delete(pollUrlBase + pollId);
    };

    dataFactoryInterface.postInvitacion = function (invitacion) {
       return $http.  post(invitacionesUrlBase, invitacion);
    };

    dataFactoryInterface.getPollsByOwner = function (ownerId) {
       return $http.get(getPollsOwnerURL+ ownerId);
    };

    dataFactoryInterface.postPoll = function (poll) {
       return $http.post(pollUrlBase, poll);
    };

    dataFactoryInterface.putPoll = function (poll) {
       return $http.put(pollUrlBase, poll);
    };

    dataFactoryInterface.putUser = function (user) {
        return $http.put(userUrlBase, user);
    };

    dataFactoryInterface.getReportResults = function (id) {
        return $http.get(reportResultsURL+id);
    };

    dataFactoryInterface.getReportPollResultsCountry = function (id) {
        return $http.get(reportPollResultsCountryURL+id);
    };

    dataFactoryInterface.getReportPollResultsTime = function (id) {
        return $http.get(reportPollResultsTimeURL+id);
    };


    return dataFactoryInterface;
}]);
