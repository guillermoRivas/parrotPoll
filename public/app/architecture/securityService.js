angular.module('parrotPollApp')
    .service('securityService', ['$auth', '$location', function($auth, $location) {

        this.logOut = function (idUser, callBack) {
            $auth.logout();
            $location.path('#/home');
        };

        this.login = function (user, callBack, errorCallBack) {
            $auth.login({
                    userName: user.userName,
                    password: user.password
                })
                .then(function(res) {
                    callBack();
                })
                .catch(function(res) {
                    errorCallBack();
                });
        };

        this.signup = function (user, callBack) {
          $auth.signup(user)
              .then(function(res) {
                  localStorage.setItem("parrotPollApp_token", res.data.token);
                  $location.path('/dashboard');
              }, function() {
                callBack();
              });
        };

        this.isAuthenticated = function (idUser, callBack) {
            return $auth.isAuthenticated();
        };




    }]);
