angular.module('pulsoe').controller('RegistroController', RegistroController);

function RegistroController($rootScope){
    var vm = this;
    $rootScope.header = "Pulso Empresarial - Registro";

    vm.register = function(){

        var userRegister = {
            nombre : vm.nombre,
            email : vm.email,
            password : vm.password
        };

        console.log(userRegister);
    };

    vm.login = function(){
        var userlogin = {
            email : vm.logEmail,
            password : vm.logPassword
        };
        console.log(userlogin);
    };
}