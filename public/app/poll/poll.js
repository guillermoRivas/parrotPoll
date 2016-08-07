angular.module('parrotPollApp')
    .controller('pollCtrl', function($scope, $http, $location, $stateParams) {
        var id = $stateParams.pollId;
        var inv = $stateParams.inv;
        var showResult = false;

        $http.get("api/poll/" + id).then(function(res) {
            $scope.poll = res.data;
            var refpoll = $scope.poll._id;
            delete $scope.poll._id;
            $scope.poll.referencePoll = refpoll;
            showResult = $scope.poll.resultIsPublic;
        }, function(res) {
            // acciones a realizar cuando se recibe una respuesta de error
        });



        $scope.seleccionar = function functionName(questions, answer) {
            questions.answers.forEach(function(item) {
                item.selected = false;
            });
            answer.selected = (answer.selected) ? false : true;
        };


        $scope.guardar = function functionName(answer) {

            $http.get('api/auth/user').then(function(res) {
                $scope.poll.userResult = res.data;
                $http.post('api/pollResult', $scope.poll).then(
                    function(res) {
                      if(inv) eliminarInvitacion();
                        if (showResult)
                            mostrarResultado();
                        else
                            terminarPoll();
                    },
                    function(response) {
                        //error en servidor
                    }
                );
            }, function() {
                $http.post('api/pollResult', $scope.poll).then(
                    function(res) {
                        if (showResult)
                            mostrarResultado();
                        else
                            terminarPoll();
                    },
                    function(response) {
                        //error en servidor
                    }
                );
            });
        };

        function terminarPoll() {
            $scope.mensajeFinal = "la poll ha terminado";
        }

        function mostrarResultado() {
            $http.get('api/pollResults/'+$scope.poll.referencePoll).then(
                function(res) {
                    $scope.resultados = res.data;
                },
                function(response) {
                    //error en servidor
                });
        }

        function  eliminarInvitacion(){
          $http.delete('api/invitation/'+inv).then(function(res) {
          });
        }
    });
