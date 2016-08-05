angular.module('parrotPollApp')
    .controller('perfilCtrl', function($scope, $http, $auth) {
        var userOriginal;
        if ($auth.isAuthenticated()) {
            $http.get('api/auth/user').then(function(res) {
                $scope.user = res.data;
                userOriginal = angular.copy(res.data);
            });
        }

        $scope.guardar = function() {

            if (userOriginal.email != $scope.user.email) {
                $http.get('api/user/existEmail/' + $scope.user.email).then(function(result) {
                    if (!result.data.result)
                        guardar();
                    else
                        $scope.errorEditar = "El email ya esta en uso";
                });
            }else{
              guardar();
            }
        };

        function guardar() {
            $http.put('api/user', $scope.user).then(
                function(res) {
                    // success callback
                    $scope.mensajeExito = "Exito en la edición";
                },
                function(response) {
                    // error
                }
            );
        }
    });
