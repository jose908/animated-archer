angular.module('MainModule').controller('SensorLocationController', ['$scope', '$http', '$window','$state', 'serverRequestService','$stateParams',
  function ($scope, $http, $window, $state, serverRequestService, $stateParams) {

  /*LOCATION TAB */

  $scope.currentPage = 1;
  $scope.numPerPage = 6;
  $scope.sensors = [];



//capture events from the subscribed socket
  io.socket.on("sensor", function(event) {
    switch(event.verb) {

      case 'created':
        $scope.sensors.push(event.data); // (add the new order to the DOM)
        $scope.$apply();              // (re-render)
        break;

    }
  });

  $scope.loadLocationTab = function (isRefresh) {

    $scope.isMapLoaded = false;
    serverRequestService.getAllSensors()
      .success(function (data, status, headers, config) {
        $scope.sensors = data;
        $scope.animation = { animation: google.maps.Animation.DROP };
        if (!isRefresh) {
          $scope.map = {center: {latitude: 41.4042, longitude: 2.195}, zoom: 12};
        }
        $scope.isMapLoaded = true;

        if ($stateParams.param != "noSensor") {
          originalParams = JSON.parse($stateParams.param);
          $scope.goToMarker (originalParams.latitude, originalParams.longitude, originalParams.sensorId);

        }

      });

    //We use this socket connection to get subscribed to the event of new sensor
    io.socket.get('/getSensors', function (body, response) {
    });

  }
  $scope.goToMarker = function (latitude, longitude, sensorId) {
    $scope.map = {center: {latitude: latitude, longitude: longitude}, zoom: 17};
    $scope.clickedMarker = sensorId;
  }
  $scope.closeClick = function (sensorId) {
    $scope.clickedMarker = sensorId;
  }
    $scope.goToStadistics = function (index) {
      console.log(index);
      $scope.go('main.stadistics', index);

    }






}]);
