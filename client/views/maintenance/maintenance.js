var maintenanceModule = angular.module('main', []);

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
var MaintenanceController = ['$rootScope', '$scope', '$http', 'Building', '$filter',
    function ($rootScope, $scope, $http, Building, $filter) {
        $scope.data = {};
        $scope.loading = true;
        $scope.month = {};
        $scope.months = {};
        $scope.maintenance = {};
        $scope.maintenance.year = '2016';
        $scope.maintenanceType = [{id: 0, type: 'Expenses'}, {id: 0, type: 'Income'}];
        $scope.typeOfMaintanances = [];
        $scope.format = 'dd/MM/yyyy';
        $scope.dateFilter = $filter('date');
        $scope.paymentDate = new Date();
        $scope.datePicker = {
            opened: false
        };
        //$scope.isAdminLogged =
        //console.log($rootScope.user, $scope.isAdminLogged);
        Building.getExpensesTypes().success(function (data) {
            $scope.typeOfMaintanances = data;
            if (data.length == 0) {
                var expensesArr = addExpenses();
                expensesArr.forEach(function (entry) {
                    Building.addExpensesTypes(entry)
                });
            }
        });

        Building.getIncomeTypes().success(function (data) {
            $scope.typeOfMaintanances = data;
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
        });

        Building.getIncomes().success(function (data) {
            $scope.allIncomes = {};
            $scope.allIncomes = data;
        });

        Building.getMonthInfo().success(function (data) {
            $scope.months = data;
            if (data.length == 0) {
                var monthArr = addMonthsInfo();
                monthArr.forEach(function (entry) {
                    Building.addMonth(entry)
                });
            }
        });

        $scope.loadTypeCategories = function () {
            $scope.typeOfMaintanances = [];
            if ($scope.maintenance.type == "Expenses") {
                Building.getExpensesTypes().success(function (data) {
                    $scope.typeOfMaintanances = data;
                });
            }
            else {
                Building.getIncomeTypes().success(function (data) {
                    $scope.typeOfMaintanances = data;
                });
            }
        };

        $scope.addMonthlyIncomeOrExpenses = function () {
            var isValid = $scope.maintenance;
            if (isValid.fullMonth && isValid.year && isValid.type) {
                isValid.period = isValid.fullMonth + '/' + isValid.year;
                isValid.createdBy = $rootScope.user.username;
                isValid.createdDate = new Date();
                if (isValid.type == "Expenses") {
                    Building.addExpense(isValid);
                    Building.getExpenses().success(function (data) {
                        $scope.expensesArr = {};
                        $scope.expensesArr = data;
                    });
                }
                else {
                    Building.addIncome(isValid);
                    Building.getIncomes().success(function (data) {
                        $scope.allIncomes = {};
                        $scope.allIncomes = data;
                    });
                }
                console.log(isValid);
            }
            $scope.maintenance = {};
            $scope.maintenance.year = new Date().getFullYear();
        };

        $scope.isAdminView = function () {
            return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
                $rootScope.user.roles.toUpperCase() == "ADMIN";
        };

        $scope.isUserView = function () {
            return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
                $rootScope.userInfo.roles.toUpperCase() == "USER";
        };

        $scope.datePickerOpen = function() {
            $scope.datePicker.opened = true;
        };

    }];

function addMonthsInfo() {
    return [
        {
            id: '1',
            fullName: 'January',
            shortName: 'jan'
        },
        {
            id: '2',
            fullName: 'February',
            shortName: 'feb'
        },
        {
            id: '3',
            fullName: 'March',
            shortName: 'mar'
        },
        {
            id: '4',
            fullName: 'April',
            shortName: 'apr'
        },
        {
            id: '5',
            fullName: 'May',
            shortName: 'may'
        },
        {
            id: '6',
            fullName: 'June',
            shortName: 'jun'
        },
        {
            id: '7',
            fullName: 'July',
            shortName: 'jul'
        },
        {
            id: '8',
            fullName: 'August',
            shortName: 'aug'
        },
        {
            id: '9',
            fullName: 'September',
            shortName: 'sep'
        },
        {
            id: '10',
            fullName: 'October',
            shortName: 'oct'
        },
        {
            id: '11',
            fullName: 'November',
            shortName: 'nov'
        },
        {
            id: '12',
            fullName: 'December',
            shortName: 'dec'
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