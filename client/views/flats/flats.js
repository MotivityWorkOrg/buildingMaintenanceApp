var flatModule = angular.module('flats', []);
var flatId = '';
flatModule.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('flats', {
            url: '/flats',
            templateUrl: 'views/flats/flats.html',
            controller: FlatsController,
            data: {
                auth: true
            }
        });
    }
]);

var FlatsController = ['$scope', 'Building', '$rootScope', function ($scope, Building, $rootScope) {
    $scope.flat = {};
    $scope.flats = [];
    $scope.addFlat = function () {
        var flatDetail = {};
        flatDetail.flat = $scope.flat;
        if (isValidForm(flatDetail.flat)) {
            flatDetail.flat.ownerName = $scope.flat.firstName.trim() + " " + $scope.flat.lastName.trim();
            flatDetail.flat.firstName = flatDetail.flat.lastName = {};
            flatDetail.tenant = {};
            flatDetail.tenant.flatNumber = "";
            if (flatDetail.flat.isOccupied === undefined) {
                flatDetail.tenant.flatNumber = flatDetail.flat.flatNumber;
                flatDetail.tenant.tenantName = flatDetail.flat.ownerName;
                flatDetail.tenant.phoneNumber = flatDetail.flat.phoneNumber;
                flatDetail.tenant.altNumber = flatDetail.flat.altNumber;
                flatDetail.tenant.emailId = flatDetail.flat.emailId;
                flatDetail.flat.tenant = flatDetail.flat.flatNumber;
                flatDetail.flat.isOccupied = false;
                if (flatId !== '') {
                    flatDetail.tenant.updatedBy = $rootScope.user.username;
                    flatDetail.tenant.updatedDate = new Date();
                }
                else {
                    flatDetail.tenant.createdBy = $rootScope.user.username;
                    flatDetail.tenant.createdDate = new Date();
                }
                flatDetail.flat.ownerName = flatDetail.flat.phoneNumber = "";
                flatDetail.flat.altNumber = flatDetail.flat.emailId = "";
            }

            for (var prop in flatDetail.flat) {
                if (flatDetail.flat.hasOwnProperty(prop)) {
                    if (prop === "firstName" || prop === "lastName") {
                        delete flatDetail.flat[prop];
                    }
                }
            }

            if (flatId !== '') {
                flatDetail.flat.updatedBy = $rootScope.user.username;
                flatDetail.flat.updatedDate = new Date();
                Building.updateFlat(flatDetail);
            }
            else {
                flatDetail.flat.createdBy = $rootScope.user.username;
                flatDetail.flat.createdDate = new Date();
                Building.addFlat(flatDetail);
            }
            $scope.flat = {};
            flatDetail = {};
            flatId = "";
            $scope.flats = [];
            // get Updated Info after transaction

            Building.getFlats().success(function (data) {
                data.forEach(function (entry) {
                    if (entry.isOccupied)
                        $scope.flats.push(entry);
                });
            });

            Building.getTenants().success(function (data) {
                data.forEach(function (entry) {
                    $scope.flats.push(entry);
                });
            });
        }
    };

    Building.getFlats().success(function (data) {
        data.forEach(function (entry) {
            if (entry.isOccupied)
                $scope.flats.push(entry);
        });
    });

    Building.getTenants().success(function (data) {
        data.forEach(function (entry) {
            $scope.flats.push(entry);
        });
    });

    $scope.updateFlatInfo = function (data) {
        flatId = data._id;
        $scope.flat.isOccupied = data.isOccupied;
        var ownerName;
        if (data.isOccupied)
            ownerName = data.ownerName.split(" ");
        else
            ownerName = data.tenantName.split(" ");
        $scope.flat.firstName = ownerName[0];
        $scope.flat.lastName = ownerName[1];
        $scope.flat.phoneNumber = Number(data.phoneNumber);
        $scope.flat.altNumber = Number(data.altNumber);
        $scope.flat.emailId = data.emailId;
        $scope.flat.flatNumber = data._id;
    };

    $scope.reset = function () {
        $scope.flat = {};
        flatId = {};
    };

    $scope.isAdminView = function () {
        return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
            $rootScope.user.roles.toUpperCase() === "ADMIN";
    };
}];

function isValidForm(flat) {
    return flat.flatNumber !== undefined && flat.firstName !== undefined &&
        flat.lastName !== undefined && flat.phoneNumber !== undefined;
}