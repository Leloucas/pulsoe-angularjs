angular.module('pulsoe-user').controller('MainController', MainController);

function MainController($rootScope){
    var vm = this;

    $rootScope.header = "Pulsoe panel";

}