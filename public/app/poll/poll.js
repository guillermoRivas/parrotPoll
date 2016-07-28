angular.module('parrotPollApp')
    .controller('pollCtrl', function($scope, $http, $routeParams) {
        var id = $routeParams.pollId;

        $http.get("api/poll/" + id).then(function(res) {
            $scope.poll = res.data;
            var refpoll = $scope.poll._id;
            delete $scope.poll._id;
            $scope.poll.referencePoll = refpoll;
        }, function(res) {
            // acciones a realizar cuando se recibe una respuesta de error
        });

        $scope.seleccionar = function functionName(answer) {
            answer.selected = (answer.selected) ? false : true;
        };

        $scope.guardar = function functionName(answer) {
            var post = $http.post('api/pollResult', $scope.poll).then(
                function(res) {
                    $location.path('/home');
                },
                function(response) {
                    //error en servidor
                }
            );
        };

    });
