angular.module('buildingService', [])

    // super simple service
    // each function returns a promise object
    .factory('Building', ['$http', function ($http) {
        return {
            /*get : function() {
             return $http.get('/api/buildingInfo');
             },*/
            create: function (maintenanceData) {
                return $http.post('/api/buildingMaintenance', maintenanceData);
            },
            delete: function (id) {
                return $http.delete('/api/buildingMaintenance/' + id);
            },

            update: function (maintenanceData) {
                return $http.post('/api/buildingMaintenance', maintenanceData);
            },

            expenses: function () {
                return $http.get('/api/expensesInfo');
            },

            addExpense: function (expense) {
                return $http.post('/api/addExpense', expense);
            },

            addIncome: function (income) {
                return $http.post('/api/addIncome', income);
            },

            getIncomes: function (selectedPeriod) {
                return $http.get('/api/incomes', {params: {period: selectedPeriod}});
            },

            getExpenses: function (selectedPeriod) {
                return $http.get('/api/expenses', {params: {period: selectedPeriod}});
            },

            getExpensesTypes: function () {
                return $http.get('/api/expensesTypes');
            },

            getIncomeTypes: function () {
                return $http.get('/api/incomeTypes');
            },

            addExpensesTypes: function (type) {
                return $http.post('/api/addExpensesType', type);
            },

            addIncomeTypes: function (type) {
                return $http.post('/api/addIncomeType', type);
            },

            updateIncome: function (type) {
                return $http.post('/api/updateIncome', type);
            },

            updateExpenses: function (type) {
                return $http.post('/api/updateExpenses', type);
            },

            getFlats: function () {
                return $http.get('/api/flats');
            },

            addFlat: function (flat) {
                return $http.post('/api/addFlat', flat);
            },

            getTenants: function () {
                return $http.get('/api/tenant');
            },

            updateFlat: function (flat) {
                return $http.post('/api/updateFlat', flat);
            },
            deleteExpense: function (id) {
                return $http.delete('/api/deleteExpense', {params: {itemId: id}});
            },

            deleteIncome: function (id) {
                return $http.delete('/api/deleteIncome', {params: {itemId: id}});
            },

            getAllFlatsNo: function(){
                return $http.get('/api/flatsInfo');
            },
            addFlatNos:function(flat){
                return $http.post('/api/addFlatsInfo', flat);
            }
        }
    }]);