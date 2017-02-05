angular.module('parrotPollApp')
    .controller('indexCtrl', ['$scope', '$location', function($scope, $location) {
var indexVm = this;
        //var
        var PASW = "4321";
        //func
        //asin
        indexVm.redirect = function() {
            if (PASW == indexVm.password) {
                $scope.$parent.$broadcast('navOk', false);
                $location.path("/home");
            }
        };
        //eje
    }]);
