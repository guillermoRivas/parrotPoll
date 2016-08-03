angular.module('parrotPollApp')
    .controller('perfilCtrl', function($scope, $http, $auth) {
      
      if ($auth.isAuthenticated()){
          $http.get('api/auth/user').then(function(res) {
              $scope.user = res.data;
          });
        }else{

        }
    });
