angular.module('parrotPollApp')
    .controller('menuCtrl', ['$location','securityService',function($location,securityService) {
        var menuVM = this;
        //checkSecurity
        securityService.checkSecurity();
        //var
        var path = $location.path();
        //func
        //asic
        menuVM.current = 1;
        //ejec
        if(path == '/dashboard')
        menuVM.current = 1;
        if(path == '/dashboard/perfil')
        menuVM.current = 2;
        if(path == '/dashboard/poll')
        menuVM.current = 3;

    }]);
