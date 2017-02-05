angular.module('parrotPollApp')
    .service('userService', ['dataFactory', function(dataFactory) {

        this.getUser = function(callBack) {
            dataFactory.getUser()
                .then(function(res) {
                    callBack(res.data);
                });
        };

        this.getInvitaciones = function functionName(idUser, callBack) {
            dataFactory.getInvitaciones(idUser)
                .then(function(res) {
                    callBack(res.data);
                });
        };

        this.rechazarInvitacion = function(invitacion, callBack) {
            dataFactory.deleteInvitaciones(invitacion._id)
                .then(function(res) {
                    callBack();
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
                });
        };

        this.existeUserEmail = function(email, callBack) {
            dataFactory.getUserExistUserEmail(email)
                .then(function(res) {
                    var existe = res.data.result;
                    callBack(existe);
                });
        };

        this.buscarUsuarios = function(nombre, callBack) {
            dataFactory.getUserByName(nombre)
                .then(function(res) {
                    callBack(res.data);
                });
        };

        this.editarUsuario = function(user, callBack) {
            dataFactory.putUser(user)
                .then(function(res) {
                    callBack(res.data);
                });
        };

    }]);
