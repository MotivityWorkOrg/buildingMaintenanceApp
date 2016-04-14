angular.module('buildingController', [])

	// inject the service factory into our controller
	.controller('mainController', ['$scope','$http','Building', function($scope, $http, Building) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all buildingInfo and show them
		// use the service to get all the buildingInfo
		Building.get()
			.success(function(data) {
				$scope.maintenanceInfo = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createMaintenanceInfo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Building.create($scope.formData)

					// if successful creation, call our get function to get all the new buildingInfo
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of buildingInfo
					});
			}
		};

		// DELETE ==================================================================

		$scope.deleteMaintenanceInfo = function(id) {
			$scope.loading = true;

			Building.delete(id)
				// if successful creation, call our get function to get all the new buildingInfo
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of buildingInfo
				});
		};
	}]);