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
            .state('dashboard', {
                url: "/dashboard",
                views: {
                    "nav": {
                        templateUrl: "app/navbar.html"
                    },
                    "menu": {
                      templateUrl: "app/dashboard/menu.html"
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
                      templateUrl: "app/dashboard/menu.html"
                    },
                    "contenido": {
                        templateUrl: "app/dashboard/perfil.html"
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
                      templateUrl: "app/dashboard/menu.html"
                    },
                    "contenido": {
                        templateUrl: "app/dashboard/poll.html"
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
    });

angular.module('parrotPollApp').factory('userFactory', function($auth, $http) {
    var interfaz = {
        user: undefined,
        isAuthenticated: function() {
            return $auth.isAuthenticated();
        },
        getUser: function() {
            if ($auth.isAuthenticated() && !interfaz.user) {
                $http.get('api/auth/user').then(function(res) {
                    interfaz.user = res.data;
                });
            }
        }
    };
    return interfaz;
});
