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

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{
            yAxisID: 'y-axis-1'
        }, {
            yAxisID: 'y-axis-2'
        }];
        $scope.options = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }, {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }]
            }
        };

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        $scope.data = [300, 500, 100, 40, 120];

    });
