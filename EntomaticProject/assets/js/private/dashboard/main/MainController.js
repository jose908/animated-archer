angular.module('MainModule').controller('MainController', ['$scope', '$http','$window', function($scope, $http, $window) {

  $scope.selectedTab = "home";
  $scope.currentPage = 1;
  $scope.numPerPage = 8;
  $scope.clickedMarker=null;




  $scope.changeTab = function(selectedTab) {

    $scope.selectedTab = selectedTab;
    $scope.isMapLoaded = false;


  }

  $scope.loadStatusTab = function (isRefresh) {

    $scope.selectedTab = 'sensorStatus';

    $http.get('/getAllSensors').
      success(function(data, status, headers, config) {

        $scope.isMapLoaded = false;
        $scope.sensors= data;
        $scope.isMapLoaded = true;

        if(!isRefresh) {
        $scope.map = { center: { latitude: 41, longitude: 1.19 }, zoom: 12 }; }

      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }
  $scope.goToMarker = function (latitude, longitude,sensorId ) {

    $scope.map = { center: { latitude: latitude, longitude: longitude }, zoom: 17 };
    $scope.clickedMarker=sensorId;
  }

  $scope.closeClick = function(sensorId) {
    $scope.clickedMarker=sensorId;
  }




}]);
