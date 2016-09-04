angular.module('parrotPollApp')
    .controller('resultadosCtrl', function($scope, $http, $stateParams) {
        var refId = $stateParams.pollId;

        $http.get("api/poll/" + refId).then(function(res) {
            $scope.poll = res.data;
        }, function(res) {
            // acciones a realizar cuando se recibe una respuesta de error
        });

        $http.get('api/pollResultsCount/' + refId).then(
            function(res) {
                $scope.totalResultados = res.data;
                $http.get('api/pollResults/' + refId).then(
                    function(res) {
                        $scope.resultados = res.data;
                    },
                    function(response) {
                        //error en servidor
                    });
            },
            function(response) {
                //error en servidor
            });



    });
