angular.module('parrotPollApp')
    .controller('navBarCtrl', ['$scope', 'userService', 'securityService', function($scope, userService, securityService) {
        var navBarVM = this;
        //Vars
        navBarVM.invitaciones = [];
        //func

        //asin

        navBarVM.logOut = function() {
            securityService.logOut();
            navBarVM.user = undefined;
        };

        navBarVM.rechazarInvitacion = function(invitacion, index) {
            userService.rechazarInvitacion(invitacion, function() {
                navBarVM.invitaciones.splice(index, 1);
            });
        };

        //ejec
        if (securityService.isAuthenticated()) {

            userService.getUser(function(data) {
                navBarVM.user = data;
                userService.getInvitaciones(navBarVM.user._id, function(data) {
                    navBarVM.invitaciones = data;
                });
            });

        } else {
            navBarVM.user = undefined;
        }
    }]);
