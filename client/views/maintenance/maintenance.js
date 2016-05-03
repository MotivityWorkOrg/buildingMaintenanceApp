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

maintenanceModule.directive('tooltipLoader', function () {
    return function (scope, element, attrs) {
        element.tooltip({
            trigger: "hover",
            placement: "top",
            delay: {show: 1000, hide: 0}
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
        $scope.maintenanceType = [{id: 0, type: 'Expenses'}, {id: 0, type: 'Income'}];
        $scope.typeOfMaintanances = [];
        $scope.format = 'dd/MM/yyyy';
        $scope.dateFilter = $filter('date');
        $scope.paymentDate = new Date();
        $scope.periodFormat = 'MMMM/yyyy';
        $scope.maintenance.period = $scope.dateFilter(new Date(), 'MMMM/yyyy');
        $scope.datePicker = {
            opened: false
        };

        $scope.periodPicker = {
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
            $scope.totalExpenses = calculateTotal(data);
        });

        Building.getIncomes().success(function (data) {
            $scope.allIncomes = {};
            $scope.allIncomes = data;
            $scope.totalIncome = calculateTotal(data);
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
            if (isValid.type) {
                isValid.period = $scope.dateFilter($scope.maintenance.period, 'MMMM/yyyy');
                isValid.createdBy = $rootScope.user.username;
                isValid.createdDate = new Date();
                if (isValid.type == "Expenses") {
                    Building.addExpense(isValid);
                    Building.getExpenses().success(function (data) {
                        $scope.expensesArr = {};
                        $scope.expensesArr = data;
                        $scope.totalExpenses = calculateTotal(data);
                    });
                }
                else {
                    Building.addIncome(isValid);
                    Building.getIncomes().success(function (data) {
                        $scope.allIncomes = {};
                        $scope.allIncomes = data;
                        $scope.totalIncome = calculateTotal(data);
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

        $scope.datePickerOpen = function () {
            $scope.datePicker.opened = true;
        };

        $scope.periodDatePickerOpen = function () {
            $scope.periodPicker.opened = true;
        }

    }];

function calculateTotal(data) {
    var total = 0.0;
    data.forEach(function (entry) {
        total += Number(entry.amount);
    });
    return total;
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