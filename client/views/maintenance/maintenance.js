var maintenanceModule = angular.module('main', []);
var savedDataId = {};
maintenanceModule.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('main', {
            url: '/main',
            templateUrl: 'views/maintenance/home.html',
            controller: MaintenanceController,
            data: {
                auth: true
            }
        });
    }
]);

maintenanceModule.directive('tooltipLoader', function () {
    return function (scope, element, attrs) {
        element.tooltip({
            trigger: "hover",
            placement: "top",
            delay: {show: 100, hide: 0}
        });
    };
});

var MaintenanceController = ['$rootScope', '$scope', '$http', 'Building', '$filter',
    function ($rootScope, $scope, $http, Building, $filter) {
        $scope.data = {};
        $scope.loading = true;
        $scope.month = {};
        $scope.months = {};
        $scope.maintenance = {};
        $scope.maintenance.year = '2016';
        $scope.maintenanceType = [{id: 1, type: 'Expenses'}, {id: 2, type: 'Incomes'}];
        $scope.typeOfMaintenance = [];
        $scope.format = 'dd/MM/yyyy';
        $scope.dateFilter = $filter('date');
        $scope.maintenance.paymentDate = new Date();
        $scope.periodFormat = 'MMMM/yyyy';
        $scope.maintenance.period = new Date();
        $scope.allFlats = getFlats();

        $scope.datePicker = {
            opened: false
        };

        $scope.periodPicker = {
            opened: false
        };
        //$scope.isAdminLogged =
        //console.log($rootScope.user, $scope.isAdminLogged);
        Building.getExpensesTypes().success(function (data) {
            $scope.listOfExpenses = data;
            if (data.length == 0) {
                var expensesArr = addExpenses();
                expensesArr.forEach(function (entry) {
                    Building.addExpensesTypes(entry)
                });
            }
        });

        Building.getIncomeTypes().success(function (data) {
            $scope.listOfIncomes = data;
            if (data.length == 0) {
                var incomeArr = addIncomes();
                incomeArr.forEach(function (entry) {
                    Building.addIncomeTypes(entry)
                });
            }
        });

        Building.getExpenses().success(function (data) {
            $scope.expensesArr = {};
            $scope.expensesArr = data;
            $scope.totalExpenses = calculateTotal(data);
        });

        Building.getIncomes().success(function (data) {
            $scope.allIncomes = {};
            $scope.allIncomes = data;
            $scope.totalIncome = calculateTotal(data);
        });

        $scope.loadTypeCategories = function () {
            $scope.typeOfMaintenance = [];
            if ($scope.maintenance.maintenanceType.type == "Expenses") {
                Building.getExpensesTypes().success(function (data) {
                    $scope.typeOfMaintenance = data;
                });
            }
            else {
                Building.getIncomeTypes().success(function (data) {
                    $scope.typeOfMaintenance = data;
                });
            }
        };

        $scope.addMonthlyIncomeOrExpenses = function () {
            var maintenanceInfo = $scope.maintenance;
            if (isValidForm(maintenanceInfo)) {
                maintenanceInfo.period = $scope.dateFilter($scope.maintenance.period, 'MMMM/yyyy');
                if (maintenanceInfo.maintenanceType === 1) {
                    maintenanceInfo.category = $scope.listOfExpenses[parseInt($scope.maintenance.category) - 1].type;
                    if (savedDataId.length !== undefined) {
                        maintenanceInfo.objectId = savedDataId;
                        maintenanceInfo.updatedBy = $rootScope.user.username;
                        maintenanceInfo.updatedDate = new Date();
                        Building.updateExpenses(maintenanceInfo);
                    }
                    else {
                        maintenanceInfo.createdBy = $rootScope.user.username;
                        maintenanceInfo.createdDate = new Date();
                        Building.addExpense(maintenanceInfo);
                    }
                    Building.getExpenses().success(function (data) {
                        $scope.expensesArr = {};
                        $scope.expensesArr = data;
                        $scope.totalExpenses = calculateTotal(data);
                    });
                }
                else {
                    maintenanceInfo.category = $scope.listOfIncomes[$scope.maintenance.category].type;
                    maintenanceInfo.flatNo = $scope.allFlats[$scope.maintenance.flat].flatNo;
                    if (savedDataId.length !== undefined) {
                        maintenanceInfo.objectId = savedDataId;
                        maintenanceInfo.updatedBy = $rootScope.user.username;
                        maintenanceInfo.updatedDate = new Date();
                        Building.updateIncome(maintenanceInfo);
                    }
                    else {
                        maintenanceInfo.createdBy = $rootScope.user.username;
                        maintenanceInfo.createdDate = new Date();
                        Building.addIncome(maintenanceInfo);
                    }
                    Building.getIncomes().success(function (data) {
                        $scope.allIncomes = {};
                        $scope.allIncomes = data;
                        $scope.totalIncome = calculateTotal(data);
                    });
                }
            }
            savedDataId = {};
            $scope.maintenance = {};
            $scope.maintenance.period = new Date();
            $scope.maintenance.paymentDate = new Date();
        };

        $scope.isAdminView = function () {
            return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
                $rootScope.user.roles.toUpperCase() == "ADMIN";
        };

        $scope.isUserView = function () {
            return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
                $rootScope.userInfo.roles.toUpperCase() == "USER";
        };

        $scope.datePickerOpen = function () {
            $scope.datePicker.opened = true;
        };

        $scope.periodDatePickerOpen = function () {
            $scope.periodPicker.opened = true;
        };

        $scope.modifyData = function (data, currentId) {
            console.log("Table Id  ", currentId);
            savedDataId = data._id;
            $scope.maintenance = {};
            $scope.maintenance.amount = data.amount;
            $scope.maintenance.comments = data.description;
            $scope.maintenance.paymentDate = new Date(data.paymentDate);
            $scope.maintenance.period = new Date(data.period);
            //$scope.maintenance.type = currentId;
            if (currentId == 'Expenses') {
                $scope.maintenance.maintenanceType = $scope.maintenanceType[0].id;
                $scope.maintenance.category = $scope.listOfExpenses[findDropdownSelected(data.category, $scope.listOfExpenses)]._id;
            }
            else {
                $scope.maintenance.maintenanceType = $scope.maintenanceType[1].id;
                $scope.maintenance.category = $scope.listOfIncomes[findDropdownSelected(data.category, $scope.listOfIncomes)]._id;
                $scope.maintenance.flat = $scope.allFlats[findFlatInfo(data.flatNo, $scope.allFlats)].id;
            }
        };

        $scope.refreshForm = function () {
            $scope.maintenance = {};
            savedDataId = {};
        }
    }];

function isValidForm(form) {
    if (form.paymentDate !== undefined && form.period !== undefined && form.maintenanceType !== undefined &&
        form.amount !== undefined && form.description !== undefined) {
        if (form.maintenanceType === 1) {
            if (form.category !== undefined)
                return true;
        }
        else if (form.maintenanceType === 2) {
            if (form.category !== undefined && form.flat !== undefined)
                return true;
        }
    }
}

function findDropdownSelected(type, list) {
    for (var i = 0; i < list.length; i++) {
        if (type == list[i].type) {
            return i;
        }
    }
}

function findFlatInfo(flatNo, list) {
    for (var i = 0; i < list.length; i++) {
        if (flatNo == list[i].flatNo) {
            return i;
        }
    }
}

function calculateTotal(data) {
    var total = 0.0;
    data.forEach(function (entry) {
        total += Number(entry.amount);
    });
    return total;
}

function getFlats() {
    return [
        {
            id: 1,
            flatNo: '101'
        },
        {
            id: 2,
            flatNo: '102'
        },
        {
            id: 3,
            flatNo: '103'
        },
        {
            id: 4,
            flatNo: '104'
        },
        {
            id: 5,
            flatNo: '201'
        },
        {
            id: 6,
            flatNo: '202'
        },
        {
            id: 7,
            flatNo: '203'
        },
        {
            id: 8,
            flatNo: '204'
        },
        {
            id: 9,
            flatNo: '301'
        },
        {
            id: 10,
            flatNo: '302'
        },
        {
            id: 11,
            flatNo: '303'
        },
        {
            id: 12,
            flatNo: '304'
        },
        {
            id: 13,
            flatNo: '401'
        },
        {
            id: 14,
            flatNo: '402'
        },
        {
            id: 15,
            flatNo: '403'
        },
        {
            id: 16,
            flatNo: '404'
        }
    ]
}

function addExpenses() {
    return [
        {
            id: '1',
            type: 'Watchman Salary'
        },
        {
            id: '2',
            type: 'Electricity Bill'
        },
        {
            id: '3',
            type: 'Water Bill'
        },
        {
            id: '4',
            type: 'Utilities'
        }
    ];
}

function addIncomes() {
    return [
        {
            id: '1',
            type: 'Flat Maintenance'

        },
        {
            id: '2',
            type: 'Other Income'
        }
    ];
}