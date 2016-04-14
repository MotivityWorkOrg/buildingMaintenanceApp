angular.module('buildingService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Building', ['$http',function($http) {
		return {
			/*get : function() {
				return $http.get('/api/buildingInfo');
			},*/
			create : function(maintenanceData) {
				return $http.post('/api/buildingMaintenance', maintenanceData);
			},
			delete : function(id) {
				return $http.delete('/api/buildingMaintenance/' + id);
			},
			
			update: function (maintenanceData) {
				return $http.post('/api/buildingMaintenance', maintenanceData);
			},

			expenses: function(){
				return $http.get('/api/expensesInfo');
			},

			getMonthInfo: function () {
				return $http.get('/api/months');
			},

			addMonth:function(monthData){
				return $http.post('/api/addMonth', monthData);
			},

			addExpense: function (expense) {
				return $http.post('/api/addExpense', expense);
			},
			getExpensesTypes: function () {
				return $http.get('/api/expensesTypes');
			},
			getIncomeTypes: function () {
				return $http.get('/api/incomeTypes');
			},

			addExpensesTypes: function(type){
				return $http.post('/api/addExpensesType', type);
			},

			addIncomeTypes: function(type){
				return $http.post('/api/addIncomeType', type);
			}
		}
	}]);