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
            templateUrl: 'views/flats.html',
            controller: FlatsController
        });
        $urlRouterProvider.otherwise('/');
    }
]);

buildingApp.directive('phoneMaxlength', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var maxLength = Number(attrs.phoneMaxlength);
            function fromUser(text) {
                //console.log("Coming in fromUser Function", typeof text, text.toString());
                var enterStr = text.toString();
                //console.log(" Enter String Length ++ ", enterStr.length);
                if (enterStr.length > maxLength) {
                    var transformedInput = enterStr.substring(0, maxLength);
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                }
                return text;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});