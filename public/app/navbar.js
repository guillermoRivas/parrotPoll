angular.module('parrotPollApp')
    .controller('navBarCtrl', function($scope, $location, $http, $auth, userFactory) {
        //$scope.currentPath = $location.path();
        if ($auth.isAuthenticated()){
            $http.get('api/auth/user').then(function(res) {
                $scope.user = res.data;
            });
          }else{
            $scope.user = undefined;
          }

          $scope.logOut = function(){
            $auth.logout();
            $scope.user = undefined;
            $location.path('#/home');
          };

    });
