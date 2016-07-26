angular.module('parrotPollApp')
    .controller('loginCtrl', function($scope, $http, $location, $cookies) {

        $scope.submit = function() {
            var post = $http.post('api/user', $scope.userReg).then(
                function(res) {
                    // success callback
                    var usuario = res.data;
                    $scope.userReg = undefined;
                    $scope.rePassword = undefined;
                    $cookies.put('usuario',JSON.stringify(res.data));
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
                        $cookies.put('usuario', JSON.stringify(res.data));
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
