angular.module('pulsoe-user', ['ngRoute', 'ngMap'])
.config(config)
.directive('file', function() {
    return {
        require:"ngModel",
        restrict: 'A',
        link: function($scope, el, attrs, ngModel){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];

                ngModel.$setViewValue(file);
                $scope.$apply();
            });
        }
    };
});

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'angular-app/dashboard-user/main/index.html',
            controller: MainController,
            controllerAs: 'vm'
        })
        .when('/registro', {
            templateUrl : 'angular-app/dashboard-user/register/index.html',
            controller: RegisterController,
            controllerAs: 'vm'
        })
        .when('/personal', {
            templateUrl : 'angular-app/dashboard-user/personal/index.html',
            controller: PersonalController,
            controllerAs: 'vm'
        })
        .when('/profesional', {
            templateUrl : 'angular-app/dashboard-user/profesional/index.html',
            controller: ProfesionalController,
            controllerAs: 'vm'
        })
        .when('/experiencia', {
            templateUrl : 'angular-app/dashboard-user/experiencia/index.html',
            controller: ExperienciaController,
            controllerAs: 'vm'
        })
        .when('/perfil', {
            templateUrl : 'angular-app/dashboard-user/profile/index.html',
            controller: ProfileController,
            controllerAs: 'vm'
        })
        .otherwise({
            template : "<h1>None</h1><p>Nothing has been selected</p>"
        });
};