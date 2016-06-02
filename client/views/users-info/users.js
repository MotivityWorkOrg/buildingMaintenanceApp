var RegUsers = angular.module('reg.users', []);

RegUsers.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('users', {
            url: '/users',
            templateUrl: 'views/users-info/users-view.html',
            controller: UsersController,
            data: {
                auth: true
            }
        });
    }
]);

var UsersController = ["$scope", "$rootScope", "AuthService",
    function ($scope, $rootScope, AuthService) {
        $scope.allUsers = [];
        $scope.loggedUser = $rootScope.user;

        $scope.deleteSelectedUser = function (user) {
            AuthService.deleteUser(user._id)
                .then(function () {
                    $scope.getAllUser();
                })
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = $rootScope.deleteErrorMessage;
                })
        };

        $scope.getAllUser = function () {
            AuthService.getRegUsers()
                .then(function () {
                    $scope.allUsers = $rootScope.regUsers;
                    $scope.error = false;
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "no users found";
                });
        };

        $scope.getAllUser();
    }
];

