angular.module('parrotPollApp')
    .controller('navBarCtrl', function($scope, $location, $http, $auth, userFactory) {
        //$scope.currentPath = $location.path();
        $scope.invitaciones = [];
        if ($auth.isAuthenticated()) {
            $http.get('api/auth/user').then(function(res) {
                $scope.user = res.data;
                cargarInvitaciones($scope.user._id);

            });
        } else {
            $scope.user = undefined;
        }

        $scope.logOut = function() {
            $auth.logout();
            $scope.user = undefined;
            $location.path('#/home');
        };

        function cargarInvitaciones(idUser) {
            $http.get('api/invitation/'+idUser).then(function(res) {
                $scope.invitaciones = res.data;
            });
        }

        $scope.rechazarInvitacion =function (invitacion, index) {
          $http.delete('api/invitation/'+invitacion._id).then(function(res) {
              $scope.invitaciones.splice(index,1);
          });
        };

    });
