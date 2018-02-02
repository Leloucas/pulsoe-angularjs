angular.module('pulsoe-user').controller('PersonalController', PersonalController);

function PersonalController($rootScope){
    var vm = this;

    vm.maxlenght = 600;

    vm.countries = [];

    userDataFactory.countries().then(function(response){
        response.forEach(function(element) {
            vm.countries.push(element.translations.es);
        }, this);
        vm.countries.push("Otro");
    }).catch(function(error){
        console.log(error);
    });

    vm.saveUserData = function(){
        var userData = {
            fechaNacimiento : vm.fechaNac,
            estadoCivil : vm.estadoCivil,
            telefono : parseInt(vm.telefono,10),
            celular : parseInt(vm.celular,10),
            pais : vm.pais,
            estado : vm.estado,
            ciudad : vm.ciudad,
            CP : parseInt(vm.zip,10),
            colonia : vm.colonia,
            calle : vm.calle,
            numCasa : parseInt(vm.numCasa,10),
            nacionalidad : vm.nacionalidad,
            licenciaConducir : vm.licenciaConducir,
            vehiculoPropio : vm.vehiculoPropio,
            lat : parseInt(vm.lat,10),
            lng : parseInt(vm.lng,10),
        };

        if(vm.userDataForm.$valid){
            console.log(userData);
        } else {
            console.log("Falta algo");
        }

    }
}