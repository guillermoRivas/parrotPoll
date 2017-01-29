angular.module('parrotPollApp')
    .controller('perfilCtrl', ['$scope', '$http', '$auth', 'userService', function($scope, $http, $auth, userService) {
        var perfilVM = this;
        //var
        var userOriginal;
        //func
        function guardar() {
            userService.editarUsuario(perfilVM.user, function() {
                perfilVM.mensajeExito = "Exito en la edición";
            });
        }
        //asic
        perfilVM.guardar = function() {

            if (userOriginal.email != perfilVM.user.email) {

                userService.existeUserEmail(perfilVM.user.email, function(data) {
                    if (!data)
                        guardar();
                    else
                        perfilVM.errorEditar = "El email ya esta en uso";
                });

            } else {
                guardar();
            }
        };
        //eje

        if ($auth.isAuthenticated()) {
            userService.getUser(function(data) {
                perfilVM.user = data;
                userOriginal = angular.copy(data);
            });

        }




    }]);
