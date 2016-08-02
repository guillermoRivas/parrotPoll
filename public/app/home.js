angular.module('parrotPollApp')
    .controller('homeCtrl', function($scope, $http, $location) {

        $scope.paginaActual = 0;
        $scope.maxPaginas = 0;
        var pollsPorPagina = 9;
        $scope.polls = [];

        $http.get("api/poll/count").then(function(res) {
          $scope.maxPaginas = Math.floor(res.data / pollsPorPagina);
        },function(res) {
          // acciones a realizar cuando se recibe una respuesta de error
        });

        function pedirPagina() {
          $http.get("api/poll?pag="+  $scope.paginaActual+"&skip="+pollsPorPagina).then(function(res) {
              $scope.polls = $scope.polls.concat(res.data);
          }, function(res) {
              // acciones a realizar cuando se recibe una respuesta de error
          });
        }

        $scope.siguientePagina = function() {
          $scope.paginaActual++;
          pedirPagina();
        };

        $scope.redirectPoll = function(poll) {
            $location.path('/poll/' + poll._id);
        };

        pedirPagina();



    });
