angular.module('parrotPollApp', ['ngRoute', 'angular-loading-bar'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "indexCtrl",
                controllerAs: "vm",
                templateUrl: "app/indexView.html"
            })
            .when("/login", {
                controller: "loginCtrl",
                controllerAs: "vm",
                templateUrl: "app/login/form.html"
            })
            .when("/opciones", {
                controller: "appCtrl",
                controllerAs: "vm",
                templateUrl: "opciones.html"
            });
    });
