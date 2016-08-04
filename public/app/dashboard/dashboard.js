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

        $scope.verEnlacePoll = function (poll) {
          alert("#/poll?pollId="+poll._id);
        };

        $scope.publicar = function (poll) {
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
        }

    });
