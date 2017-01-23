angular.module('parrotPollApp')
    .service('userService', ['dataFactory', function(dataFactory) {

        this.getUser = function(callBack) {
            dataFactory.getUser()
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.getInvitaciones = function functionName(idUser, callBack) {
            dataFactory.getInvitaciones(idUser)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.rechazarInvitacion = function(invitacion, callBack) {
            dataFactory.deleteInvitaciones(invitacion._id)
                .then(function(res) {
                    callBack();
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.validarPassUser = function(user, rePass) {
            var result = true;

            result = user.password == rePass;

            return result;
        };

        this.existeUserName = function(userName, callBack) {
            dataFactory.getUserExistUserName(userName)
                .then(function(res) {
                  var existe = res.data.result !== undefined;
                    callBack(existe);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.existeUserEmail = function(email, callBack) {
            dataFactory.getUserExistUserEmail(email)
                .then(function(res) {
                  var existe = result.data.result !== undefined;
                    callBack(existe);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.buscarUsuarios = function(nombre, callBack) {
            dataFactory.getUserByName(name)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };




    }]);
