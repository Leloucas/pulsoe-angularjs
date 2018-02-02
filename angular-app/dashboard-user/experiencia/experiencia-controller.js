angular.module('pulsoe-user').controller('ExperienciaController', ExperienciaController);

function ExperienciaController($rootScope){
    var vm = this;

    vm.maxlenght = 600;
    
    vm.experiencias = [];

    $rootScope.header = "Pulsoe panel - Experiencia Profesional";

    vm.saveUserExperiencia = function(){
        var userJob = [];
        var userData = {
            nombre : vm.nombre,
            giroEmpresa : vm.giro,
            cargo : vm.cargo,
            area : vm.area,
            fechaInicio : vm.feInicio,
            fechaFinal : vm.getFecha(vm.feFinal, vm.actual),
            trabajoActual : vm.actual,
            descripcion : vm.descripcion
        };
        
        

        if(vm.userExperienciaForm.$valid){
            userJob.push(userData);
            vm.experiencias.push(userData.nombre);

            console.log(vm.experiencias);
            console.log(userData);
            vm.resetForm(vm.userExperienciaForm);
        } else {
            console.log("Falta algo")
        }

    }
    vm.resetForm = function(form) {
      //Even when you use form = {} it does not work
      form = angular.copy({});
    }
    
    vm.getFecha = function(fecha, actual){
        var fechaActual;
        if(!actual){
            fechaActual = fecha;
        } else {
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            fechaActual = day+"/"+month+"/"+year;
        }
        console.log(actual);
        return fechaActual;
    }
}