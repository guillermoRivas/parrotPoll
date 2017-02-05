angular.module('parrotPollApp')
    .controller('pollCtrl', ['$stateParams', 'pollService', 'userService', '$location', function($stateParams, pollService, userService, $location) {
        var pollVM = this;
        //vars
        var id = $stateParams.pollId;
        var inv = $stateParams.inv;
        var showResult = false;
        //func
        function terminarPoll() {
            pollVM.mensajeFinal = "La votación ha terminado";
            pollVM.Finalizado = true;
        }

        function mostrarResultado() {
            pollService.ResultsCount(pollVM.poll.referencePoll, function(data) {
                pollVM.totalResultados = data;
            });

            pollService.getResults(pollVM.poll.referencePoll, function(res) {
                pollVM.resultados = res;
            });
        }
        //asin
pollVM.Finalizado = false;
        pollVM.ocultarPreguntas = false;

        pollVM.seleccionar = function(questions, answer) {
            questions.answers.forEach(function(item) {
                item.selected = false;
            });
            answer.selected = (answer.selected) ? false : true;
        };
pollVM.home = function () {
    $location.path('/home');
};
        pollVM.guardar = function(answer) {
            if (!pollService.validatePoll(pollVM.poll)) {
                pollVM.mensajeError = "contesta todas las preguntas";
                return -1;
            }

            pollVM.poll.locationResult = pollVM.location;

            pollService.savePollResult(pollVM.poll, function() {
                pollVM.ocultarPreguntas = true;
                if (inv) userService.borrarInvitacion(inv);
                if (showResult)
                    mostrarResultado();
                else
                    terminarPoll();
            });
        };

        //eje
        pollService.getPoll(id, function (res) {
          pollVM.poll = res;
          var refpoll = pollVM.poll._id;
          delete pollVM.poll._id;
          pollVM.poll.referencePoll = refpoll;
          showResult = pollVM.poll.resultIsPublic;
        });

//TODO sacar a servicio
        $.get("http://ipinfo.io", function(response) {
            var loc = {
                ip: response.ip,
                country: response.country,
                region: response.region,
                city: response.city
            };
            pollVM.location = loc;
        }, "jsonp");


    }]);
