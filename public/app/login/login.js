angular.module('parrotPollApp')
    .controller('loginCtrl', function($scope, $http) {

        $scope.submit = function() {
            var post = $http.post('api/user', $scope.userReg).then(
                function(res) {
                    // success callback
                    $scope.usuario = res.data;
                    $scope.userReg = undefined;
                },
                function(response) {
                    // failure callback
                }
            );
        };
    });
