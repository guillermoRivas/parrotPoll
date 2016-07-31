angular.module('parrotPollApp')
    .controller('loginSingupCtrl', function($scope, $http, $location) {

        $scope.submit = function() {
            var post = $http.post('api/user', $scope.userReg).then(
                function(res) {
                    // success callback
                    var usuario = res.data;
                    $scope.userReg = undefined;
                    $scope.rePassword = undefined;
                    $location.path('/dashboard');
                },
                function(response) {
                    $scope.errorRegistro = "No se ha podido registrar el usuario";
                }
            );
        };

        $scope.login = function() {
            var post = $http.post('api/user/log', $scope.user).then(
                function(res) {
                    // success callback
                    var usuario = res.data;
                    $scope.userReg = undefined;
                    if (usuario) {
                        $location.path('/dashboard');
                    } else {
                        $scope.usuarioNoValido = "Contraseña o usuario incorrecto";
                    }
                },
                function(response) {

                }
            );
        };

    });
