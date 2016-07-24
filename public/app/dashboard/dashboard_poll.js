angular.module('parrotPollApp')
    .controller('dashboardPollCtrl', function($scope, $http) {
      var question = {name: 'new question', answers : [{name:'new answer'}] };
      var poll = {name: 'new name', description: 'new description', questions : [question]};
      $scope.poll=poll;

      $scope.newQuestion = function() {
        $scope.poll.questions.push({name: 'new question', answers : [{name:'new answer'}]});
      };

      $scope.newAnswer = function(question) {
        question.answers.push({name:'new answer'});
      };
    });
