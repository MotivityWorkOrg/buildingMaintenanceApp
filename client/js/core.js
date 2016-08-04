buildingApp = angular.module('buildingMaintenanceApp',
    ['buildingService', 'ui.bootstrap', 'ui.bootstrap.tpls',
        'authService', 'ui.router', 'users', 'main', 'flats',
        'ngOnlyNumberApp', 'reg.users']);

buildingApp.directive('phoneMaxlength', function () {
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

buildingApp.config(function ($urlRouterProvider, $httpProvider) {
    //Configure to http provider.
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //session check and redirect to specific state
    if (!window.sessionStorage["userInfo"]) {
        $urlRouterProvider.otherwise("/login");
    } else {
        $urlRouterProvider.otherwise("/home");
    }
});

//Run phase
buildingApp.run(function ($rootScope, $state) {
    $rootScope.$state = $state; //Get state info in view
    $rootScope.dashboardClass = 'login-page';
    if (window.sessionStorage["userInfo"]) {
        $rootScope.userInfo = window.sessionStorage["userInfo"];
        $rootScope.user = JSON.parse(window.sessionStorage["userInfo"]);
        $rootScope.dashboardClass = 'inner-home';
    }

    //Check session and redirect to specific page
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState && toState.data && toState.data.auth && !window.sessionStorage["userInfo"]) {
            event.preventDefault();
            window.location.href = "#login";
        }

        if (!toState && !toState.data && !toState.data.auth && window.sessionStorage["userInfo"]) {
            event.preventDefault();
            window.location.href = "#home";
        }
    });
});