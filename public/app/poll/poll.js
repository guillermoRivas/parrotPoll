angular.module('parrotPollApp')
    .controller('pollCtrl', function($scope, $http, $routeParams) {
      var id = $routeParams.pollId;

      $http.get("api/poll/"+id).then(function(res) {
          $scope.poll = res.data;
      }, function(res) {
          // acciones a realizar cuando se recibe una respuesta de error
      });

    });
