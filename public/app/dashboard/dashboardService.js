angular.module('parrotPollApp')
    .service('dashboardService', ['$location', 'dataFactory', function($location, dataFactory) {

        this.crearEnlacePoll = function(poll) {
            var enlace = $location.absUrl();
            enlace = enlace.replace("dashboard", "poll?pollId=");
            return (enlace + poll._id);
        };

        this.publicarPoll = function(poll, callback) {
            poll.published = true;

            dataFactory.putPoll(poll)
                .then(function(res) {
                    callback(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.borrarPoll = function(poll, callback) {
            poll.published = true;
            dataFactory.deletePoll(poll._id)
                .then(function(res) {
                    callback(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.invitarUsuario = function(userFor, currentUser, poll, callback) {
            var invitacion = {
                forRef: userFor._id,
                fromRef: currentUser._id,
                fromName: currentUser.userName,
                pollRef: poll._id,
                pollText: poll.name
            };

            dataFactory.postInvitacion(invitacion)
                .then(function(res) {
                    callback(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.cambiarEstadoPoll = function(poll, callback) {
            poll.isPublic = !poll.isPublic;
            dataFactory.putPoll(poll)
                .then(function(res) {
                    callback(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.getPollsByOwner = function(user, callback) {
            dataFactory.getPollsByOwner(user._id)
                .then(function(res) {
                    callback(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.guardarPoll = function(poll, callback) {

            poll.published = !poll.published;

            dataFactory.postPoll(poll)
                .then(function(res) {
                    callback(res);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.editarPoll = function(poll, callback) {
            dataFactory.putPoll(poll)
                .then(function(res) {
                    callback();
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        var comonerReprtResults = function(data) {
            var result = {
                lavels: [],
                data: []
            };

            data.forEach(function(element, index, array) {
                result.lavels.push(element.name);
                result.data.push(element.nresults);
            });

            return result;
        };


        this.getReportResults = function(id, callback) {
            dataFactory.getReportResults(id)
                .then(function(res) {
                    var result = comonerReprtResults(res.data);
                    callback(result);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        var comonerReprtResultsCountry = function(data) {
            var result = {
                lavels: [],
                data: []
            };

            data.forEach(function(element, index, array) {
                result.lavels.push(element._id);
                result.data.push(element.nResults);
            });

            return result;
        };

        this.getReportPollResultsCountry = function(id, callback) {
            dataFactory.getReportPollResultsCountry(id)
                .then(function(res) {
                  var result = comonerReprtResultsCountry(res.data);
                  callback(result);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        var comonerReprtResultsTime = function(data) {
            var result = {
                lavels: [],
                data: []
            };

            data.forEach(function(element, index, array) {
                result.lavels.push(element._id);
                result.data.push(element.nResults);
            });

            return result;
        };

        this.getReportPollResultsTime = function(id, callback) {
            dataFactory.getReportPollResultsCountry(id)
                .then(function(res) {
                  var result = comonerReprtResultsTime(res.data);
                  callback(result);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

    }]);
