var UserController = ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {
        $scope.signup = {};
        $scope.login = {};
        $scope.validRoles = ['- Select Role -', 'ADMIN', 'USER'];
        $scope.selectedRole = $scope.validRoles[0];
        //console.log("$scope.releSelected    ", $scope.releSelected)
        $scope.doLogin = function () {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.login.username, $scope.login.password)
                // handle success
                .then(function () {
                    $location.path('/main');
                    $scope.disabled = false;
                    $scope.login = {};
                    $scope.user = AuthService.user;
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.login = {};
                })

        };

        $scope.doRegister = function (isValid) {
            if(isValid && $scope.selectedRole !== '- Select Role -')
            {
                // initial values
                $scope.error = false;
                $scope.disabled = true;
                $scope.signup.createDate = new Date();
                // call register from service
                $scope.signup.roles = $scope.selectedRole;
                console.log("Signup resg form   ", $scope.signup);
                AuthService.register($scope.signup)
                    // handle success
                    .then(function () {
                        $location.path('/login');
                        $scope.disabled = false;
                        $scope.signup = {};
                    })
                    // handle error
                    .catch(function () {
                        $scope.error = true;
                        $scope.errorMessage = "Something went wrong!";
                        $scope.disabled = false;
                        $scope.signup = {};
                    });
            }
        };

        $scope.refreshForm = function () {
            $scope.signup = {};
            $scope.login = {};
        };

        $scope.rolesDropdownSelected = function(item){
            $scope.selectedRole = item;
            console.log(" Dropdwon selected item is  ", $scope.signup, item)
        }
    }];
