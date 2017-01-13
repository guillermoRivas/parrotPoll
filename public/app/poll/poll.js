angular.module('parrotPollApp')
    .controller('pollCtrl', function($scope, $http, $location, $stateParams) {
        $scope.ocultarPreguntas = false;
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
        $.get("http://ipinfo.io", function(response) {
          var loc = {
            ip: response.ip,
            country: response.country,
            region: response.region,
            city: response.city
          };
          $scope.location = loc;
        }, "jsonp");
        $scope.seleccionar = function functionName(questions, answer) {
            questions.answers.forEach(function(item) {
                item.selected = false;
            });
            answer.selected = (answer.selected) ? false : true;
        };


        $scope.guardar = function functionName(answer) {
            if (!validar()) {
                $scope.mensajeError = "contesta todas las preguntas";
                return -1;
            }
            $scope.poll.locationResult = $scope.location;
            $http.get('api/auth/user').then(function(res) {
                $scope.poll.userResult = res.data;
                $http.post('api/pollResult', $scope.poll).then(
                    function(res) {
                        $scope.ocultarPreguntas = true;
                        if (inv) eliminarInvitacion();
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
                        $scope.ocultarPreguntas = true;
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

            $http.get('api/pollResultsCount/' + $scope.poll.referencePoll).then(
                function(res) {
                    $scope.totalResultados = res.data;
                    $http.get('api/pollResults/' + $scope.poll.referencePoll).then(
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
        }

        function validar() {
            var result = true;
            $scope.poll.questions.forEach(function(element, index) {
                var r = false;
                element.answers.forEach(function(item, i) {
                    r = r || item.selected || (item.selected !== undefined);
                });
                if (!r) result = false;
            });
            return result;
        }

        function eliminarInvitacion() {
            $http.delete('api/invitation/' + inv).then(function(res) {});
        }
    });
