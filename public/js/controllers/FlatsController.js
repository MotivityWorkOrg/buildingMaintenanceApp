var FlatsController = ['$scope', 'Building', function($scope, Building){
    $scope.flat = {};
    $scope.flats = {};
    $scope.addFlat = function(){
        var flatDetail = $scope.flat;
        flatDetail.ownerName = $scope.flat.firstName + " " + $scope.flat.lastName;
        flatDetail.tenant = {};
        flatDetail.tenant.flatNumber = "";
        if(flatDetail.isOccupied === undefined){
            flatDetail.tenant.flatNumber = flatDetail.flatNumber;
            flatDetail.tenant.ownerName = flatDetail.ownerName;
            flatDetail.tenant.phoneNumber = flatDetail.phoneNumber;
            flatDetail.tenant.altNumber = flatDetail.altNumber;
            flatDetail.tenant.emailId = flatDetail.emailId;
            flatDetail.isOccupied = false;
            flatDetail.tenant.createdBy = "Ravi";
            flatDetail.tenant.createdDate = new Date();
            flatDetail.ownerName = flatDetail.phoneNumber = "";
            flatDetail.altNumber = flatDetail.emailId = "";
        }
        flatDetail.createdBy = "Ravi";
        flatDetail.createdDate = new Date();
        Building.addFlat(flatDetail);
        $scope.flat = {};
    };

    Building.getFlats().success(function (data){
        $scope.flats = data;
        console.log(" Saved Flats :::  ", data)
    });
}];
