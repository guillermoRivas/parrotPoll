angular.module('parrotPollApp')
    .controller('indexCtrl', function($scope, $http, $location) {
        var PASW = "4321";
        $scope.redirect = function() {
            if (PASW == $scope.password) {
              $scope.$parent.$broadcast('navOk', false);
              $location.path("/home");

            }
        };

    });
