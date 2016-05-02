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

			addIncome: function (income) {
				return $http.post('/api/addIncome', income);
			},

			getIncomes: function () {
				return $http.get('/api/incomes');
			},

			getExpenses:function(){
				return $http.get('/api/expenses');
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
			},

			updateIncome:function(type){
				return $http.post('/api/updateIncome', type);
			},

			updateExpenses:function(type){
				return $http.post('/api/updateExpenses', type);
			},

			getFlats: function(){
				return $http.get('/api/flats');
			},

			addFlat: function(flat){
				return $http.post('/api/addFlat', flat);
			},

			getTenants: function(){
				return $http.get('/api/tenant');
			},

			addUser: function(registerForm){
				return $http.post('/api/registerUser', registerForm);
			},

			getUser: function(){
				return $http.get('api/loginUser');
			}
		}
	}]);