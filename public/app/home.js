angular.module('parrotPollApp')
    .controller('homeCtrl', ['$scope', '$http', '$location', 'pollService', 'utilService',function($scope, $http, $location, pollService, utilService) {
      var homeVM = this;
      //Vars
        homeVM.paginaActual = 0;
        homeVM.maxPaginas = 0;
        homeVM.polls = [];
        var pollsPorPagina = 9;
        //func
        var concatPolls = function(data){
          homeVM.polls = homeVM.polls.concat(data);
        };

        function pedirPagina() {
          pollService.getPolls(homeVM.paginaActual, pollsPorPagina,concatPolls);
        }

        //asin
        homeVM.siguientePagina = function() {
            homeVM.paginaActual++;
            pedirPagina();
        };

        homeVM.redirectPoll = function(poll) {
            $location.path('#/poll?pollId=' + poll._id);
        };

        homeVM.calcularFecha = function (date) {
          return utilService.calcularFecha(date);
        };

        //ejec

        pollService.getMaxPaginas(pollsPorPagina, function(data) {
          homeVM.maxPaginas = data;
        });

        pedirPagina();

    }]);
