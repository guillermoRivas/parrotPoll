angular.module('parrotPollApp', ['ngRoute', 'angular-loading-bar','ngMessages', 'ngCookies'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "indexCtrl",
                controllerAs: "vm",
                templateUrl: "app/indexView.html"
            })
            .when("/home", {
                controller: "homeCtrl",
                controllerAs: "vm",
                templateUrl: "app/home.html"
            })
            .when("/login", {
                controller: "loginCtrl",
                controllerAs: "vm",
                templateUrl: "app/login/login.html"
            })
            .when("/poll/:pollId", {
                controller: "pollCtrl",
                controllerAs: "vm",
                templateUrl: "app/poll/poll.html"
            })
            .when("/dashboard", {
                controller: "dashboardCtrl",
                controllerAs: "vm",
                templateUrl: "app/dashboard/dashboard_index.html"
            })
            .when("/dashboard/poll", {
                controller: "dashboardPollCtrl",
                controllerAs: "vm",
                templateUrl: "app/dashboard/dashboard_poll.html"
            })
            .when("/opciones", {
                controller: "appCtrl",
                controllerAs: "vm",
                templateUrl: "opciones.html"
            })
            .otherwise({ redirectTo: '/home' });
    });

angular.module('parrotPollApp').directive("passwordVerify", function() {
  return {
    require: "ngModel",
    scope: {
      passwordVerify: '='
    },
    link: function(scope, element, attrs, ctrl) {
      scope.$watch(function() {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue) {
             combined = scope.passwordVerify + '_' + ctrl.$viewValue;
          }
          return combined;
      }, function(value) {
          if (value) {
              ctrl.$parsers.unshift(function(viewValue) {
                  var origin = scope.passwordVerify;
                  if (origin !== viewValue) {
                      ctrl.$setValidity("passwordVerify", false);
                      return undefined;
                  } else {
                      ctrl.$setValidity("passwordVerify", true);
                      return viewValue;
                  }
              });
          }
      });
   }
 };
});
