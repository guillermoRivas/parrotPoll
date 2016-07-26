angular.module('parrotPollApp')
    .controller('dashboardCtrl', function($scope, $http, $cookies) {
        $scope.usuario = JSON.parse($cookies.get('usuario'));
        $http.get("api/poll").then(function(res) {
            $scope.polls = res.data;
        }, function(res) {
            // acciones a realizar cuando se recibe una respuesta de error
        });
    });
