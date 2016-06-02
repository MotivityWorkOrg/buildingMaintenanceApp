var maintenanceModule = angular.module('main', []);
var itemId = '';
var currentCategory = '';
var selectedPeriod = '';
var errorMessageString = '';
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

var MaintenanceController = ['$rootScope', '$scope', 'Building', '$filter', '$uibModal',
    function ($rootScope, $scope, Building, $filter, $uibModal) {
        $scope.appData = this;
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
        $scope.animationsEnabled = true;
        selectedPeriod = $scope.dateFilter(new Date(), 'MMMM/yyyy');
        $scope.getAllFlats = [];
        $scope.errorMessage = '';
        $scope.dateOptions = {
            maxDate: new Date(),
            minMode: 'month'
        };

        $scope.userDateOptions = {
            maxDate: new Date(),
            minMode: 'month'
        };
        $scope.adminViewDateOptions = {
            maxDate: new Date(),
            showWeeks: false
        };

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

        Building.getExpenses(selectedPeriod).success(function (data) {
            $scope.expensesArr = {};
            $scope.expensesArr = data;
            $scope.totalExpenses = calculateTotal(data);
            $scope.getActualResult = getActualResult($scope.totalIncome, $scope.totalExpenses);
            $scope.spanColor = Number($scope.getActualResult) < 0 ? 'ng-value-red' : 'ng-value-green';
        });

        Building.getIncomes(selectedPeriod).success(function (data) {
            $scope.allIncomes = {};
            $scope.allIncomes = data;
            $scope.totalIncome = calculateTotal(data);
            $scope.getActualResult = getActualResult($scope.totalIncome, $scope.totalExpenses);
            $scope.spanColor = Number($scope.getActualResult) < 0 ? 'ng-value-red' : 'ng-value-green';
        });

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
            $scope.errorMessage = "";
            if (isMaintenanceFormValid(maintenanceInfo)) {
                if ($scope.savedItemCanDelete) {
                    var selectedItemId = itemId;
                    itemId = '';
                }
                maintenanceInfo.period = $scope.dateFilter($scope.maintenance.period, 'MMMM/yyyy');
                if (maintenanceInfo.maintenanceType === 1) {
                    maintenanceInfo.category = $scope.listOfExpenses[parseInt($scope.maintenance.category) - 1].type;
                    if (itemId !== '') {
                        maintenanceInfo.objectId = itemId;
                        maintenanceInfo.updatedBy = $rootScope.user.username;
                        maintenanceInfo.updatedDate = new Date();
                        Building.updateExpenses(maintenanceInfo);
                    }
                    else {
                        maintenanceInfo.createdBy = $rootScope.user.username;
                        maintenanceInfo.createdDate = new Date();
                        Building.addExpense(maintenanceInfo);
                    }
                }
                else {
                    maintenanceInfo.category = $scope.listOfIncomes[parseInt($scope.maintenance.category) - 1].type;
                    maintenanceInfo.flatNo = $scope.getAllFlats[parseInt($scope.maintenance.flat) - 1].flatNo;
                    if (itemId !== '') {
                        maintenanceInfo.objectId = itemId;
                        maintenanceInfo.updatedBy = $rootScope.user.username;
                        maintenanceInfo.updatedDate = new Date();
                        Building.updateIncome(maintenanceInfo);
                    }
                    else {
                        maintenanceInfo.createdBy = $rootScope.user.username;
                        maintenanceInfo.createdDate = new Date();
                        Building.addIncome(maintenanceInfo);
                    }
                }
                if ($scope.savedItemCanDelete) {
                    if (currentCategory === 'Expenses') {
                        Building.deleteExpense(selectedItemId).success(function (data) {
                            console.log("Selected Expenses item has been deleted", data)
                        })
                    }
                    else {
                        Building.deleteIncome(selectedItemId).success(function (data) {
                            console.log("Selected Income item has been deleted", data)
                        })
                    }
                }
                Building.getIncomes(selectedPeriod).success(function (data) {
                    $scope.allIncomes = {};
                    $scope.allIncomes = data;
                    $scope.totalIncome = calculateTotal(data);
                    $scope.getActualResult = getActualResult($scope.totalIncome, $scope.totalExpenses);
                    $scope.spanColor = Number($scope.getActualResult) < 0 ? 'ng-value-red' : 'ng-value-green';
                });

                Building.getExpenses(selectedPeriod).success(function (data) {
                    $scope.expensesArr = {};
                    $scope.expensesArr = data;
                    $scope.totalExpenses = calculateTotal(data);
                    $scope.getActualResult = getActualResult($scope.totalIncome, $scope.totalExpenses);
                    $scope.spanColor = Number($scope.getActualResult) < 0 ? 'ng-value-red' : 'ng-value-green';
                });
                itemId = '';
                currentCategory = '';
                $scope.maintenance = {};
                $scope.maintenance.period = new Date();
                $scope.maintenance.paymentDate = new Date();
            }
            else {
                $scope.errorMessage = errorMessageString;
            }
        };

        $scope.isAdminView = function () {
            return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
                $rootScope.user.roles.toUpperCase() == "ADMIN";
        };

        $scope.isUserView = function () {
            return $rootScope.user !== undefined && $rootScope.user.roles !== undefined &&
                $rootScope.user.roles.toUpperCase() == "USER";
        };

        $scope.datePickerOpen = function () {
            $scope.datePicker.opened = true;
        };

        $scope.periodDatePickerOpen = function () {
            $scope.periodPicker.opened = true;
        };

        $scope.modifyData = function (data, currentId) {
            $scope.errorMessage = "";
            currentCategory = currentId;
            itemId = data._id;
            $scope.maintenance = {};
            $scope.maintenance.amount = data.amount;
            $scope.maintenance.description = data.description;
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
                $scope.maintenance.flat = $scope.getAllFlats[findFlatInfo(data.flatNo, $scope.getAllFlats)]._id;
            }
        };

        $scope.refreshForm = function () {
            $scope.maintenance = {};
            itemId = '';
            currentCategory = '';
            $scope.savedItemCanDelete = false;
        };

        $scope.changeCategory = function () {
            if ($scope.maintenance.maintenanceType !== null) {
                var selectedType = parseInt($scope.maintenance.maintenanceType) - 1;
                if (itemId !== '' && currentCategory !== $scope.maintenanceType[selectedType].type) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '../views/maintenance/Popup.html',
                        controller: 'changeCategoryController',
                        backdrop: 'static',
                        keyboard: false
                    });

                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                        console.log("Modal instance Selected Item is ++ ", selectedItem);
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                }
                else {
                    $scope.savedItemCanDelete = false;
                }
            }
        };
        $scope.getUserSelectedMonthInfo = function () {
            var date = new Date();
            if ($scope.maintenance.currentYear !== "" && $scope.maintenance.currentYear <= date.getFullYear()) {
                selectedPeriod = $scope.maintenance.currentYear;
            }
            else {
                selectedPeriod = $scope.dateFilter($scope.maintenance.period, 'MMMM/yyyy');
            }

            Building.getExpenses(selectedPeriod).success(function (data) {
                $scope.expensesArr = {};
                $scope.expensesArr = data;
                $scope.totalExpenses = calculateTotal(data);
                $scope.getActualResult = getActualResult($scope.totalIncome, $scope.totalExpenses);
                $scope.spanColor = Number($scope.getActualResult) < 0 ? 'ng-value-red' : 'ng-value-green';
            });

            Building.getIncomes(selectedPeriod).success(function (data) {
                $scope.allIncomes = {};
                $scope.allIncomes = data;
                $scope.totalIncome = calculateTotal(data);
                $scope.getActualResult = getActualResult($scope.totalIncome, $scope.totalExpenses);
                $scope.spanColor = Number($scope.getActualResult) < 0 ? 'ng-value-red' : 'ng-value-green';
            });
        }
    }];

maintenanceModule.controller('changeCategoryController', ['$scope', '$uibModalInstance',
    function ($scope, $uibModalInstance) {
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.$$prevSibling.maintenance = {};
            $scope.$$prevSibling.maintenance.period = new Date();
            $scope.$$prevSibling.maintenance.paymentDate = new Date();
            itemId = currentCategory = '';
        };

        $scope.deleteSelected = function () {
            $uibModalInstance.dismiss();
            if ($scope.$$prevSibling !== undefined && $scope.$$prevSibling.maintenance !== undefined) {
                $scope.$$prevSibling.savedItemCanDelete = true;
                $scope.$$prevSibling.maintenance.amount = '';
                $scope.$$prevSibling.maintenance.description = '';
                $scope.$$prevSibling.maintenance.category = null;
                console.log("Modal selected Item is OK  ")
            }
        }
    }
]);

function isMaintenanceFormValid(form) {
    if (form.period === undefined || form.period === '') {
        errorMessageString = "Select Maintenance period";
        return false;
    }
    else if (form.paymentDate === undefined || form.paymentDate === '') {
        errorMessageString = "Select payment date";
        return false;
    }
    else if (form.maintenanceType === undefined || form.maintenanceType === null) {
        errorMessageString = "Select maintenance type";
        return false;
    }
    else if (form.maintenanceType === 1 || form.maintenanceType === 2) {
        if (form.category === undefined || form.category === null) {
            errorMessageString = "Select Category type";
            return false;
        }
        else if (form.maintenanceType === 2 && (form.flat === undefined || form.flat === null)) {
            errorMessageString = "Select flat no";
            return false;
        }
        else if (form.amount === undefined || form.amount === '') {
            errorMessageString = "Enter Amount";
            return false;
        }
        else {
            errorMessageString = "";
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

function getActualResult(a, b) {
    if (a !== '' && b !== '') {
        var incomes = isNaN(a) ? 0.0 : Number(a);
        var expenses = isNaN(b) ? 0.0 : Number(b);
        return incomes - expenses;
    }
}

function getFlats() {
    return [
        {
            id: 1,
            flatNo: 101
        },
        {
            id: 2,
            flatNo: 102
        },
        {
            id: 3,
            flatNo: 103
        },
        {
            id: 4,
            flatNo: 104
        },
        {
            id: 5,
            flatNo: 201
        },
        {
            id: 6,
            flatNo: 202
        },
        {
            id: 7,
            flatNo: 203
        },
        {
            id: 8,
            flatNo: 204
        },
        {
            id: 9,
            flatNo: 301
        },
        {
            id: 10,
            flatNo: 302
        },
        {
            id: 11,
            flatNo: 303
        },
        {
            id: 12,
            flatNo: 304
        },
        {
            id: 13,
            flatNo: 401
        },
        {
            id: 14,
            flatNo: 402
        },
        {
            id: 15,
            flatNo: 403
        },
        {
            id: 16,
            flatNo: 404
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