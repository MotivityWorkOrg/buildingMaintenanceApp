buildingApp = angular.module('buildingMaintenanceApp', ['buildingService', 'ui.router']);

buildingApp.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('main', {
            name:"home",
            url: '/',
            templateUrl: 'views/home.html',
            controller: MaintenanceController
        });
        $stateProvider.state('flats', {
            name:"flats",
            url: '/flats',
            templateUrl: 'views/flats.html'
            //controller: FlatsController
        });
        $stateProvider.state('miscellaneous', {
            name:"miscellaneous",
            url: '/miscellaneous',
            templateUrl: 'views/home.html'
            //controller: MiscellaneousController
        });
        $urlRouterProvider.otherwise('/');
    }
]);