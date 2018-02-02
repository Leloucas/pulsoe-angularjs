angular.module('pulsoe-user').controller('ProfileController', ProfileController);

function ProfileController($rootScope, userDataFactory){
    var vm = this;

    $rootScope.header = "Pulsoe panel - Perfil Profesional";
    
    vm.user = [];
    vm.experiencia = [];
    vm.formacion = [];
    vm.capacitacion = [];
    vm.habilidad = [];
    vm.idioma = [];
    vm.puestos = [];
    vm.sueldo = [];
    vm.software = [];
    vm.valores = [];

    userDataFactory.getDatos().then(function(response){
        response.forEach(function(element) {
            vm.user.push(element);
        }, this);
        vm.user = response[0];
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getExperiencia().then(function(response){
        response.forEach(function(element) {
            vm.experiencia.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getFormacion().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.formacion.push(element);
        }, this);
        vm.formacion = response[0];
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getPuestos().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.puestos.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getValores().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.valores.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    
    userDataFactory.getSueldo().then(function(response){
        // console.log(response);
        vm.sueldo = response[0];
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getCapacitacion().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.capacitacion.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getHabilidad().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.habilidad.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getSoftware().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.software.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    userDataFactory.getIdioma().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            vm.idioma.push(element);
        }, this);
    }).catch(function(error){
        console.log(error);
    });

    
    // vm.userVacantes = {
    // }
    // getFormacion
    // getCapacitacion
    // getHabilidad
    // getIdioma
    // getPuestos
    // getSoftware
    // getSueldo
    // getValores
}