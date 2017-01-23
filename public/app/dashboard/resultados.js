angular.module('parrotPollApp')
    .controller('resultadosCtrl', ['$scope', '$http', '$stateParams', 'dashboardService', 'pollService', function($scope, $http, $stateParams, dashboardService, pollService) {
        var resultados = this;
        //var
        var refId = $stateParams.pollId;
        //func
        //asic
        resultadosVM.labels = ["January", "February", "March", "April", "May", "June", "July"];
        resultadosVM.series = ['Series A', 'Series B'];
        resultadosVM.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        resultadosVM.onClick = function(points, evt) {
            console.log(points, evt);
        };
        resultadosVM.datasetOverride = [{
            yAxisID: 'y-axis-1'
        }, {
            yAxisID: 'y-axis-2'
        }];
        resultadosVM.options = {
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

        resultadosVM.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        resultadosVM.data = [300, 500, 100, 40, 120];

        //eje
        pollService.getPoll(refId, function(data) {
            resultadosVM.poll = data;
        });

        pollService.ResultsCount(refId, function(data) {
            resultadosVM.totalResultados = data;
            pollService.getResults(refId, function(res) {
                resultadosVM.resultados = res.data;
            });
        });

    }]);
