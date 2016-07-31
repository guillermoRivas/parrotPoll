angular.module('parrotPollApp')
    .controller('navBarCtrl', function($scope, $location) {
        $scope.currentPath = $location.path();
    });
