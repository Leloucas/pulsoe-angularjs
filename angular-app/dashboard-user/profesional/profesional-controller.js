angular.module('pulsoe-user').controller('ProfesionalController', ProfesionalController);

function ProfesionalController($rootScope){
    var vm = this;

    vm.maxlenght = 600;
    
    $rootScope.header = "Pulsoe panel - Perfil Profesional";

    vm.saveUserProfesional = function(){
        var userData = {
            titulo : vm.titulo,
            descripcion : vm.descripcion
        };

        if(vm.userProfesionalForm.$valid){
            console.log(userData);
        } else {
            console.log("Falta algo")
        }

    }
}