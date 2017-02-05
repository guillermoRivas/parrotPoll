angular.module('parrotPollApp')
    .controller('loginSingupCtrl', ['$location', '$auth', 'userService', 'securityService', function($location, $auth, userService, securityService) {
        var loginSingupVM = this;
        //vars
        //func

        function singup() {
            securityService.signup(loginSingupVM.userReg, function() {
                loginSingupVM.errorRegistro = "No se ha podido registrar el usuario";
            });
        }
        //asic

        loginSingupVM.submit = function() {
            var passValid = userService.validarPassUser(loginSingupVM.userReg, loginSingupVM.rePassword);
            if (!passValid) {
                loginSingupVM.errorRegistro = "Las contraseñas no coinciden";
                return -1;
            }

            userService.existeUserName(loginSingupVM.userReg.userName, function(res) {
                if (!res) {
                    userService.existeUserEmail(loginSingupVM.userReg.email, function(result) {
                        if (!result)
                            singup();
                        else
                            loginSingupVM.errorRegistro = "El email ya esta en uso";
                    });

                } else
                    loginSingupVM.errorRegistro = "El nombre de usuario ya existe";
            });
        };

        loginSingupVM.login = function() {
            securityService.login(loginSingupVM.user, function() {
                loginSingupVM.userReg = undefined;
                $location.path("/dashboard");
            }, function() {
                loginSingupVM.usuarioNoValido = "Usuario o contraseña incorrectos";
            });

        };

    }]);
//ejec
