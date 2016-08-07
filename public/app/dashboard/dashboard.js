angular.module('parrotPollApp')
    .controller('dashboardCtrl', function($scope, $http) {

        $http.get('api/auth/user').then(function(res) {
            $scope.usuario = res.data;
            $http.get("api/poll/owner/" + $scope.usuario._id).then(function(res) {
                $scope.polls = res.data;
            }, function(res) {
                // acciones a realizar cuando se recibe una respuesta de error
            });
        });

        $scope.verEnlacePoll = function(poll) {
            alert("#/poll?pollId=" + poll._id);
        };

        $scope.publicar = function(poll) {
            poll.published = true;
            var post = $http.put('api/poll', poll).then(
                function(res) {
                    // success callback
                    //$scope.poll = res.data;
                    $scope.mensajeExito = "Exito en la edición";
                },
                function(response) {
                    poll.published = false;
                }
            );
        };

        $scope.selectPoll = function(poll) {
            $scope.selectPoll = poll;
        };

        $scope.buscarUsuario = function() {
            if ($scope.strUsuarioBuscar.length >= 3) {
                $http.get("api/user/names/" + $scope.strUsuarioBuscar).then(function(res) {
                    $scope.listaBusqueda = res.data;
                }, function(res) {
                    // acciones a realizar cuando se recibe una respuesta de error
                });
            }
        };

        $scope.invitar = function(userFor) {
            var invitacion = {
                forRef: userFor._id,
                fromRef: $scope.usuario._id,
                fromName: $scope.usuario.userName,
                pollRef: $scope.selectPoll._id,
                pollText: $scope.selectPoll.name
            };

            $http.post('api/invitation', invitacion).then(
                function(res) {
                    //exito
                },
                function(response) {
                    //error
                }
            );
        };

    });
