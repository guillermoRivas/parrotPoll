angular.module('parrotPollApp')
    .controller('menuCtrl', function($scope, $http, $location) {
        var menuVM = this;
        var path = $location.path();
        menuVM.current = 1;
        //var
        //func
        //asic
        //ejec
        if(path == '/dashboard')
        menuVM.current = 1;
        if(path == '/dashboard/perfil')
        menuVM.current = 2;
        if(path == '/dashboard/poll')
        menuVM.current = 3;

    });
