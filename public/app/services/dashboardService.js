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

        Date.prototype.addDays = function(days) {
          var dat = new Date(this.valueOf());
          dat.setDate(dat.getDate() + days);
          return dat;
        };

        this.getReportPollResultsCountry = function(id, callback) {
            dataFactory.getReportPollResultsCountry(id)
                .then(function(res) {
                    var result = comonerReprtResultsCountry(res.data);
                    callback(result);
                });
        };

        var comonerReprtResultsTime = function(data) {
            var result = {
                lavels: [],
                data: []
            };
            var rangos = [];
            if (false) {
                var first = new Date(data[0].time);
                var second = new Date(data[data.length - 1].time);
                var dif = Math.round((second - first) / (1000 * 60 * 60 * 24));
                dif = (dif/10);
                for (i = 0; i < 10; i++) {
                    var days = dif * (i + 1);
                    rangos.push(first.addDays(days));
                }

                rangos.forEach(function(element, index, array) {
                    var fecha = element;
                    var count = 0;

                    data.forEach(function(element, index, array) {
                        var time = new Date(element.time);
                        if (fecha.getTime() <= time.getTime())
                            count += element.nresults;
                    });

                    result.lavels.push(fecha);
                    result.data.push(count);

                });

            } else {

                data.forEach(function(element, index, array) {

                    var fecha = element._id.day + "-" + element._id.month + "-" + element._id.year;
                    result.lavels.push(fecha);
                    result.data.push(element.nresults);
                });
            }
            return result;
        };

        this.getReportPollResultsTime = function(id, callback) {
            dataFactory.getReportPollResultsTime(id)
                .then(function(res) {
                    var result = comonerReprtResultsTime(res.data);
                    callback(result);
                });
        };

    }]);
