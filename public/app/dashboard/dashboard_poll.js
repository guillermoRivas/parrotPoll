angular.module('parrotPollApp')
    .controller('dashboardPollCtrl', function($scope, $http, $cookies, $location) {
      var usuario = JSON.parse($cookies.get('usuario'));

      var question = {text: 'Pregunta ...?', answers : [{text:'Respuesta ...'}] };
      var poll = {name: 'new name', description: 'new description', questions : [question]};
      $scope.poll=poll;
      $scope.poll.owner=[usuario._id];
      $scope.poll.isPublic=true;
      $scope.poll.resultIsPublic=true;

      $scope.newQuestion = function() {
        $scope.poll.questions.push({name: 'Pregunta ...?', answers : [{name:'Respuesta ...'}]});
      };

      $scope.newAnswer = function(question) {
        question.answers.push({name:'Respuesta ...'});
      };

      $scope.guardar = function(){
        var post = $http.post('api/poll', $scope.poll).then(
            function(res) {
                // success callback
                $location.path('/dashboard');
            },
            function(response) {
                // error
            }
        );
      };

    });
