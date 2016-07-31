angular.module('parrotPollApp')
    .controller('homeCtrl', function($scope,$http,$location) {
        $scope.polls = [];
        $http.get("api/poll").then(function(res) {
            $scope.polls = res.data;
        }, function(res) {
            // acciones a realizar cuando se recibe una respuesta de error
        });

        $scope.redirectPoll = function(poll) {
          $location.path('/poll/'+poll._id);
        };
    });
