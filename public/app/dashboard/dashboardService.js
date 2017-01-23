angular.module('parrotPollApp')
    .service('dashboardService', ['$location', 'dataFactory', function($location, dataFactory) {

        this.crearEnlacePoll = function(date) {
            var enlace = $location.absUrl();
            enlace = enlace.replace("dashboard", "poll?pollId=");
            return (enlace + poll._id);
        };

        this.publicarPoll = function(poll, callback) {
            poll.published = true;

            dataFactory.putPoll(poll)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.borrarPoll = function(poll, callback) {
            poll.published = true;
            dataFactory.deletePoll(poll._id)
                .then(function(res) {
                    callBack(res.data);
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
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.cambiarEstadoPoll = function(poll, callback) {
            poll.isPublic = !poll.isPublic;
            dataFactory.putPoll(poll)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.getPollsByOwner = function(user, callback) {
            dataFactory.getPollsByOwner(user._id)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };


    }]);
