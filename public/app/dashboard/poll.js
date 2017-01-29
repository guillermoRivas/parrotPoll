angular.module('parrotPollApp')
    .controller('dashboardPollCtrl', ['$scope', '$http', '$location', '$stateParams', 'dashboardService', 'userService', 'pollService', function($scope, $http, $location, $stateParams, dashboardService, userService, pollService) {
        var dashboardPollVM = this;
        //var
        //func
        function guardar() {
            dashboardService.guardarPoll(dashboardPollVM.poll, function() {
                $location.path('/dashboard');
            });
        }

        function editar() {
            dashboardService.editarPoll(dashboardPollVM.poll, function() {
                dashboardPollVM.mensajeExito = "Exito en la edición";
            });
        }
        //asic
        dashboardPollVM.mensajeError = undefined;
        dashboardPollVM.modoEdicion = false;
        dashboardPollVM.newQuestion = function() {
            dashboardPollVM.poll.questions.push({
                name: undefined,
                answers: [{
                    name: undefined
                }]
            });
        };

        dashboardPollVM.deleteQuestion = function(index) {
            dashboardPollVM.poll.questions.splice(index, 1);
        };

        dashboardPollVM.newAnswer = function(question) {
            question.answers.push({
                name: undefined
            });
        };

        dashboardPollVM.deleteAnswer = function(question, index) {
            question.answers.splice(index, 1);
        };

        dashboardPollVM.guardar = function() {
            if (dashboardPollVM.modoEdicion) {
                editar();
            } else {
                guardar();
            }
        };

        //ejec
        if ($stateParams.pollId) {
            dashboardPollVM.modoEdicion = true;
            pollService.getPoll($stateParams.pollId, function(res) {
                dashboardPollVM.poll = res;
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

            dashboardPollVM.poll = poll;

            userService.getUser(function(res) {
                dashboardPollVM.usuario = res;
                dashboardPollVM.poll.owner = [dashboardPollVM.usuario._id];
                dashboardPollVM.poll.ownerName = dashboardPollVM.usuario.userName;
            });


            dashboardPollVM.poll.isPublic = true;
            dashboardPollVM.poll.resultIsPublic = true;
            dashboardPollVM.poll.published = false;
        }



    }]);
