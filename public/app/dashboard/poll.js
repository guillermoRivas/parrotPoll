angular.module('parrotPollApp')
    .controller('dashboardPollCtrl', function($scope, $http, $location, $stateParams) {
        $scope.mensajeError = undefined;
        $scope.modoEdicion = false;

        if ($stateParams.pollId) {
            $scope.modoEdicion = true;

            $http.get("api/poll/" + $stateParams.pollId).then(function(res) {
                $scope.poll = res.data;
            }, function(res) {
                // acciones a realizar cuando se recibe una respuesta de error
            });

        } else {
            var question = {
                text: undefined,
                answers: [{
                    text: undefined
                }]
            };
            var poll = {
                name: undefined,
                description: undefined,
                questions: [question]
            };
            $scope.poll = poll;
            $http.get('api/auth/user').then(function(res) {
                $scope.usuario = res.data;
                $scope.poll.owner = [$scope.usuario._id];
            });

            $scope.poll.isPublic = true;
            $scope.poll.resultIsPublic = true;
            $scope.poll.published = false;
        }

        $scope.newQuestion = function() {
            $scope.poll.questions.push({
                name: undefined,
                answers: [{
                    name: undefined
                }]
            });
        };

        $scope.deleteQuestion = function(index) {
            $scope.poll.questions.splice(index, 1);
        };

        $scope.newAnswer = function(question) {
            question.answers.push({
                name: undefined
            });
        };

        $scope.deleteAnswer = function(question, index) {
            question.answers.splice(index, 1);
        };

        $scope.guardar = function() {
            if($scope.modoEdicion){
              editar();
            }else{
              guardar();
            }
        };

        function guardar() {
          var post = $http.post('api/poll', $scope.poll).then(
              function(res) {
                  // success callback
                  $location.path('/dashboard');
              },
              function(response) {
                  // error
              }
          );
        }

        function editar() {
          var post = $http.put('api/poll', $scope.poll).then(
              function(res) {
                  // success callback
                  //$scope.poll = res.data;
                  $scope.mensajeExito = "Exito en la edición";
              },
              function(response) {
                  // error
              }
          );
        }

    });
