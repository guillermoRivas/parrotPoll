angular.module('parrotPollApp')
    .controller('dashboardCtrl', ['dashboardService', 'userService','securityService', function(dashboardService, userService, securityService) {
        var dashboardVM = this;
        //checkSecurity
        securityService.checkSecurity();
        //var
        //func
        //asin

        dashboardVM.series = ['Series A'];

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
                dashboardVM.polls.splice(index, 1);
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

          dashboardService.getReportResults(dashboardVM.usuario._id, function (res) {
            dashboardVM.labels = res.lavels;
            dashboardVM.data = res.data;
          });

          dashboardService.getPollsByOwner(dashboardVM.usuario,function (res) {
                dashboardVM.polls = res;
          });
        });

    }]);
