angular.module('pulsoe').controller('ContactoController', ContactoController);

function ContactoController($rootScope){
    var vm = this;

    $rootScope.header = "Contacto";

    vm.name = 'pulso';

}