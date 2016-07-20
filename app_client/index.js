angular.module('parrotPollApp')
    .controller('indexCtrl', function($scope,$http) {
        $scope.polls = [];
        $http.get("api/poll").then(function(res) {
            $scope.polls = res.data;
        }, function(res) {
            // acciones a realizar cuando se recibe una respuesta de error
        });
    });
