var MaintenanceController = ['$scope', '$http', 'Building', function($scope, $http, Building){
    $scope.data = {};
    $scope.loading = true;
    $scope.month = {};
    $scope.months = {};
    $scope.maintenance = {};
    $scope.maintenance.year = '2016';
    $scope.maintenanceType = [{id:0, type:'Expenses'}, {id:0, type:'Income'}];
    $scope.typeOfMaintanances = [];

    /*Building.expenses().success(function(data) {
        //alert(data);
        $scope.maintenanceInfo = data;
        console.log("getting 0.. ", data);
        if(data.length == 0){
            var expensesArr = addExpenses();
            expensesArr.forEach(function(entry){
                //console.log(entry);
                Building.addExpense(entry)
            });
        }
        $scope.loading = false;
    });*/

    Building.getMonthInfo().success(function (data) {
        $scope.months = data;
    });

    $scope.addMonth = function () {
        console.log($scope.month);
        Building.addMonth($scope.month).success(function (data) {
            $scope.month  = {};
        })
    };

    $scope.loadTypeCategories = function () {
        $scope.typeOfMaintanances = [];
        if($scope.maintenance.type == "Expenses")
        {
            Building.getExpensesTypes().success(function (data) {
                $scope.typeOfMaintanances = data;
                if(data.length == 0){
                    var expensesArr = addExpenses();
                    expensesArr.forEach(function(entry){
                        Building.addExpensesTypes(entry)
                    });
                }
            })
        }
        else {
            Building.getIncomeTypes().success(function (data) {
                $scope.typeOfMaintanances = data;
                if(data.length == 0){
                    var incomeArr = addIncomes();
                    incomeArr.forEach(function(entry){
                        Building.addIncomeTypes(entry)
                    });
                }
            })
        }
    };

    $scope.addMonthExpenses = function(){
        if($scope.maintenance.length > 0){
            var period = $scope.maintenance.fullMonth+ '/' + $scope.maintenance.year;
            $scope.maintenance.period = period;
            console.log($scope.maintenance);
        }

    }
}];

function addExpenses(){
    return [
        {
            id:'1',
            type: 'Watchman Salary'

        },
        {
            id:'2',
            type: 'Electricity Bill'
        },
        {
            id:'3',
            type: 'Water Bill'
        },
        {
            id:'4',
            type: 'Utilities'
        }
    ];
}

function addIncomes(){
    return [
        {
            id:'1',
            type: 'Flat Maintenance'

        },
        {
            id:'2',
            type: 'Other Income'
        }
    ];
}