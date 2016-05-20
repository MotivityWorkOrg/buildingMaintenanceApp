var flatModule = angular.module('flats', []);
var flatId = '';
var errorMessageString = '';
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
    $scope.getAllFlats = [];
    $scope.errorMessage = '';
    $scope.addFlat = function () {
        var flatDetail = {};
        $scope.errorMessage = '';
        flatDetail.flat = $scope.flat;
        if (isValidForm(flatDetail.flat)) {
            flatDetail.flat.ownerName = $scope.flat.firstName + " " + $scope.flat.lastName;
            flatDetail.flat.firstName = flatDetail.flat.lastName = {};
            flatDetail.tenant = {};
            flatDetail.tenant.flatNumber = "";
            var flatNumber = flatDetail.flat.flatNumber;
            flatDetail.flat.flatNumber = $scope.getAllFlats[parseInt(flatNumber) - 1].flatNo;
            if (flatDetail.flat.isOccupied === undefined) {
                flatDetail.tenant.flatNumber = $scope.getAllFlats[parseInt(flatNumber) - 1].flatNo;
                flatDetail.tenant.tenantName = flatDetail.flat.ownerName;
                flatDetail.tenant.phoneNumber = flatDetail.flat.phoneNumber;
                flatDetail.tenant.altNumber = flatDetail.flat.altNumber;
                flatDetail.tenant.emailId = flatDetail.flat.emailId;
                flatDetail.flat.tenant = $scope.getAllFlats[parseInt(flatNumber) - 1].flatNo;
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
        else {
            $scope.errorMessage = errorMessageString;
        }
    };

    Building.getAllFlatsNo().success(function (data) {
        $scope.getAllFlats = data;
        if (data.length === 0) {
            var flats = getFlats();
            flats.forEach(function (flat) {
                Building.addFlatNos(flat).success(function (savedFlat) {
                    $scope.getAllFlats.push(savedFlat);
                })
            })
        }
    });

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
        $scope.flat.flatNumber = $scope.getAllFlats[findFlatInfo(data._id, $scope.getAllFlats)]._id;
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
    if (flat.flatNumber === undefined || flat.flatNumber === null) {
        errorMessageString = "Please select Flat number";
        return false;
    }
    else if (flat.firstName === undefined || flat.firstName === '') {
        errorMessageString = "Please enter owner first name";
        return false;
    }
    else if (flat.lastName === undefined || flat.lastName === '') {
        errorMessageString = "Please enter owner last name";
        return false;
    }
    else if (flat.phoneNumber === undefined || flat.phoneNumber === '') {
        errorMessageString = "Please enter phone number";
        return false;
    }
    else {
        errorMessageString = "";
        return true;
    }
}

function findFlatInfo(flatNo, list) {
    for (var i = 0; i < list.length; i++) {
        if (flatNo == list[i].flatNo) {
            return i;
        }
    }
}