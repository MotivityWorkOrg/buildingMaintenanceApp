angular.module('buildingService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Building', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/buildingInfo');
			},
			create : function(maintenanceData) {
				return $http.post('/api/buildingMaintenance', maintenanceData);
			},
			delete : function(id) {
				return $http.delete('/api/buildingMaintenance/' + id);
			},
			
			update: function (maintenanceData) {
				return $http.post('/api/buildingMaintenance', maintenanceData);
			}
		}
	}]);