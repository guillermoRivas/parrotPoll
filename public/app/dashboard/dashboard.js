angular.module('parrotPollApp')
    .controller('dashboardCtrl', ['$scope', '$http', '$location', 'dashboardService', 'userService', function($scope, $http, $location, dashboardService, userService) {
        var dashboardVM = this;
        //var
        //func
        //asin
        dashboardVM.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        dashboardVM.series = ['Series A'];

        dashboardVM.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];

        dashboardVM.verEnlacePoll = function(poll) {
            dashboardVM.enlace = dashboardService.crearEnlacePoll(poll);
        };

        dashboardVM.publicar = function(poll) {
            dashboardService.publicarPoll(poll, function() {
                dashboardVM.mensajeExito = "Exito en la edición";
                poll.published = true;
            });
        };

        dashboardVM.selectPoll = function(poll) {
            dashboardVM.selectPoll = poll;
        };

        dashboardVM.buscarUsuario = function() {
            if (dashboardVM.strUsuarioBuscar.length >= 3) {
                userService.buscarUsuarios(dashboardVM.strUsuarioBuscar, function(data) {
                    dashboardVM.listaBusqueda = data;
                });
            }
        };

        dashboardVM.borrarPoll = function(poll, index) {
            dashboardService.borrarPoll(poll, function() {
                $scope.polls.splice(index, 1);
            });
        };

        dashboardVM.invitar = function(userFor) {
            dashboardService.invitarUsuario(userFor, dashboardVM.usuario, dashboardVM.selectPoll, function(data) {
                //exito
            });
        };

        dashboardVM.cambiarEstadoPoll = function(poll) {
          dashboardService.cambiarEstadoPoll(poll, function (data) {
            //exito
          });
        };
        
        //eje

        userService.getUser(function (data) {
          dashboardVM.usuario = data;

          dashboardService.getPollsByOwner(dashboardVM.usuario,function (res) {
                dashboardVM.polls = res.data;
          });
        });

    }]);
