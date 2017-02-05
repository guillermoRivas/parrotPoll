angular.module('parrotPollApp')
    .controller('resultadosCtrl', ['$stateParams', 'dashboardService', 'pollService', 'securityService', function($stateParams, dashboardService, pollService, securityService) {
      //checkSecurity
      securityService.checkSecurity();
        var resultadosVM = this;
        //var
        var refId = $stateParams.pollId;
        //func
        //asic
        resultadosVM.CharPolar = {};

        resultadosVM.CharPolar.onClick = function(points, evt) {
            console.log(points, evt);
        };

        resultadosVM.CharPolar.datasetOverride = [{
            yAxisID: 'y-axis-1'
        }, {
            yAxisID: 'y-axis-2'
        }];

        resultadosVM.CharPolar.options = {
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

        resultadosVM.charLine = {};
        //eje
        pollService.getPoll(refId, function(data) {
            resultadosVM.poll = data;
        });

        dashboardService.getReportPollResultsCountry(refId, function(data) {
            resultadosVM.CharPolar.labels = data.lavels;
            resultadosVM.CharPolar.data = [data.data];
        });

        dashboardService.getReportPollResultsTime(refId, function(data) {
          resultadosVM.charLine.labels = data.lavels;
          resultadosVM.charLine.data = [data.data];
        });

        pollService.ResultsCount(refId, function(data) {
            resultadosVM.totalResultados = data;
            pollService.getResults(refId, function(res) {
                resultadosVM.resultados = res;
            });
        });

    }]);
