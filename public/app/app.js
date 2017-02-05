angular.module('parrotPollApp', ['ui.router', 'satellizer', 'angular-loading-bar', 'ngMessages', 'chart.js'])
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
                        templateUrl: "app/home/home.html"
                    }
                }
            })
            .state('error500', {
                url: "/error500",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "contenido": {
                        templateUrl: "app/errors/error.html"
                    }
                }
            })
            .state('error404', {
                url: "error404",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "contenido": {
                        templateUrl: "app/error/error404.html"
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
            })
            .state('pollResult', {
                url: "/poll?pollId&inv",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "contenido": {
                        templateUrl: "app/poll/poll.html"
                    }
                }
            })
            .state('resultados', {
                url: "/dashboard/resultados?pollId",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "contenido": {
                        templateUrl: "app/dashboard/resultados/resultados.html"
                    }
                }
            })
            .state('dashboard', {
                url: "/dashboard",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "menu": {
                        templateUrl: "app/dashboard/menu/menu.html"
                    },
                    "contenido": {
                        templateUrl: "app/dashboard/dashboard_index.html"
                    }
                }
            })
            .state('perfil', {
                url: "/dashboard/perfil",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "menu": {
                        templateUrl: "app/dashboard/menu/menu.html"
                    },
                    "contenido": {
                        templateUrl: "app/dashboard/perfil/perfil.html"
                    }
                }
            })
            .state('createEditPoll', {
                url: "/dashboard/poll?pollId",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "menu": {
                        templateUrl: "app/dashboard/menu/menu.html"
                    },
                    "contenido": {
                        templateUrl: "app/dashboard/poll/poll.html"
                    }
                }
            });
        $urlRouterProvider.otherwise("/");
    })
    .config(function($authProvider) {
        $authProvider.loginUrl = "api/auth/login";
        $authProvider.signupUrl = "api/auth/singup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "parrotPollApp";
    }).config(function($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }).config(function($compileProvider, $logProvider, $httpProvider) {
        // Replaced by Gulp build task
        $compileProvider.debugInfoEnabled('@@debugInfoEnabled' !== 'false');
        $logProvider.debugEnabled('@@debugLogEnabled' !== 'false');
        $httpProvider.interceptors.push('HttpInterceptor');
    }).config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
