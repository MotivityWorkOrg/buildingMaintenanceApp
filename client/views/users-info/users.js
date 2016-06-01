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
        $scope.loggedUsers = [];

        AuthService.getRegUsers()
            .then(function () {
                $scope.loggedUsers = $rootScope.regUsers;
                $scope.error = false;
            })
            // handle error
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "no users found";
            });

        $scope.deleteUser = function (user) {
            AuthService.deleteUser(user.username)
                .then(function () {
                    $scope.error = false;
                })
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "User logged in, please choose another User";
                })
        }
    }
];

