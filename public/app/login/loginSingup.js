angular.module('parrotPollApp')
    .controller('loginSingupCtrl', function($scope, $http, $location, $auth, userFactory) {

        $scope.submit = function() {

            if ($scope.userReg.password != $scope.rePassword) {
                $scope.errorRegistro = "Las contraseñas no coinciden";
                return 0;
            }

            var get = $http.get('api/user/exist/' + $scope.userReg.userName).then(
                function(res) {
                    // success callback
                    if (!res.data.result) {
                        $http.get('api/user/existEmail/' + $scope.userReg.email).then(function(result) {
                            if (!result.data.result)
                                singup();
                            else
                                $scope.errorRegistro = "El email ya esta en uso";
                        });

                    } else
                        $scope.errorRegistro = "El nombre de usuario ya existe";
                },
                function(response) {

                }
            );
        };

        function singup() {
            $auth.signup($scope.userReg)
                .then(function(res) {
                    $scope.userReg = undefined;
                    $scope.rePassword = undefined;
                    //userFactory.getUser();
                    //localStorage.setItem("token", res.data.token);
                    localStorage.setItem("parrotPollApp_token",res.data.token)
                    $location.path('/dashboard');
                }, function() {
                    $scope.errorRegistro = "No se ha podido registrar el usuario";
                });
        }

        $scope.login = function() {

            $auth.login({
                    userName: $scope.user.userName,
                    password: $scope.user.password
                })
                .then(function(res) {

                    // Si se ha logueado correctamente, lo tratamos aquí.
                    // Podemos también redirigirle a una ruta
                    $scope.userReg = undefined;
                    //userFactory.getUser();
                    //localStorage.setItem("token", res.data.token);
                    $location.path("/dashboard");
                })
                .catch(function(res) {
                    $scope.usuarioNoValido = "Usuario o contraseña incorrectos";
                });
        };

    });
