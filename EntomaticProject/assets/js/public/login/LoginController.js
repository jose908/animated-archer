angular.module('LoginModule').controller('LoginController', ['$scope', '$http', function($scope, $http){

    $scope.loginForm = {
    loading: false
    }
    $scope.loginForm = {
    userValidation: false
    }


    $scope.submitLoginForm = function(){

      $scope.loginForm.loading = true;

      // Submit request to Sails.
      $http.put('/login', {
        user: $scope.loginForm.user,
        password: $scope.loginForm.password
      })
        .then(function onSuccess (){
          // Refresh the page now that we've been logged in.
          window.location = '/';
        }).catch(function onError(sailsResponse) {

        // Handle known error type(s).
        // Invalid username / password combination.
        if (sailsResponse.status === 400 || 404) {
          // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
          //
          $scope.loginForm.loading = false;
          $scope.loginForm.userValidation = true;
          return;
        }

      });
    }


    $scope.disableWarning = function() {

      $scope.loginForm.userValidation = false;


    }




}]);

