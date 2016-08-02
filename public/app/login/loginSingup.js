angular.module('parrotPollApp')
    .controller('loginSingupCtrl', function($scope, $http, $location, $auth, userFactory) {

        $scope.submit = function() {
            var get = $http.get('api/user/exist/' + $scope.userReg.userName).then(
                function(res) {
                    // success callback
                    if (!res.data.result)
                        singup();
                    else
                        $scope.errorRegistro = "El nombre de usuario ya existe";
                },
                function(response) {

                }
            );
        };

        function singup() {
            $auth.signup($scope.userReg)
                .then(function() {
                    $scope.userReg = undefined;
                    $scope.rePassword = undefined;
                    //userFactory.getUser();
                    //localStorage.setItem("token", res.data.token);
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
                    // Si ha habido errores llegamos a esta parte
                });
        };

    });
