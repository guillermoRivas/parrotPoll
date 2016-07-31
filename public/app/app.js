angular.module('parrotPollApp', ['ui.router', 'satellizer', 'angular-loading-bar', 'ngMessages'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: "/",
            })
            .state('home', {
                url: "/home",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "contenido": {
                        templateUrl: "app/home.html"
                    }
                }
            })
            .state('loginSingup', {
                url: "/entrar",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "contenido": {
                        templateUrl: "app/login/loginSingup.html"
                    }
                }
            });
        $urlRouterProvider.otherwise("/");
    })
    .config(function($authProvider) {
        $authProvider.loginUrl = "api/auth/login";
        $authProvider.signupUrl = "api/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "parrotPollApp";
    });
