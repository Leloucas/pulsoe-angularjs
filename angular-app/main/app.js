angular.module('pulsoe', ['ngRoute', 'ngAnimate'])
.config(config);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'angular-app/main/pulsoe/index.html',
            controller: IndexController,
            controllerAs: 'vm'
        })
        .when('/servicios', {
            templateUrl : 'angular-app/main/servicios/index.html',
            controller : ServiciosController,
            controllerAs : 'vm'
        })
        .when('/servicios/:servicio', {
            templateUrl : 'angular-app/main/servicios/servicio.html',
            controller : ServicioController,
            controllerAs : 'vm'
        })
        .when('/principios', {
            templateUrl : 'angular-app/main/nosotros/index.html',
            controller : PrincipiosController,
            controllerAs : 'vm'
        })
        .when('/codigo', {
            templateUrl : 'angular-app/main/nosotros/index.html',
            controller : CodigoController,
            controllerAs : 'vm'
        })
        .when('/compromiso', {
            templateUrl : 'angular-app/main/nosotros/index.html',
            controller : CompromisoController,
            controllerAs : 'vm'
        })
        .when('/contacto', {
            templateUrl : 'angular-app/main/contacto/index.html',
            controller : ContactoController,
            controllerAs : 'vm'
        })
        .when('/registro', {
            templateUrl : 'angular-app/main/registro/index.html',
            controller : RegistroController,
            controllerAs : 'vm'
        })
        .otherwise({
            template : "<h1>None</h1><p>Nothing has been selected</p>"
        });
}