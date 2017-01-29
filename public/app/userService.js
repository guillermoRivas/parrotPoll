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

        this.borrarInvitacion = function(id) {
            dataFactory.deleteInvitaciones(id)
                .then(function(res) {
                  
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
                  var existe = res.data.result;
                    callBack(existe);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.existeUserEmail = function(email, callBack) {
            dataFactory.getUserExistUserEmail(email)
                .then(function(res) {
                  var existe = res.data.result;
                    callBack(existe);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.buscarUsuarios = function(nombre, callBack) {
            dataFactory.getUserByName(nombre)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };

        this.editarUsuario = function(user, callBack) {
            dataFactory.putUser(user)
                .then(function(res) {
                    callBack(res.data);
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
        };


    }]);
