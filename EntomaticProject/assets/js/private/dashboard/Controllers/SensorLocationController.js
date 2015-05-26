angular.module('MainModule').controller('SensorLocationController', ['$scope', '$http', '$window','$state', 'serverRequestService','$stateParams',
  function ($scope, $http, $window, $state, serverRequestService, $stateParams) {

  /*LOCATION TAB */

    $scope.currentPageSensor = 1;
    $scope.currentPageGateway = 1;
    $scope.numPerPage = 6;
    $scope.sortTypes = [{name: 'Sort by Date Asc', query: 'createDate ASC'}, {name: 'Sort by Date Desc', query: 'createDate DESC'}, {name: 'Sort by Gateway', query: 'gatewayId ASC'}];

    $scope.status = {
      openGateway: true,
      openSensor:true

    };

    $scope.sensors = [];
    $scope.icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';



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

    if (!isRefresh) {
    $scope.selectedSortType = $scope.sortTypes[0];
      $scope.isMapLoaded = false;
    }


    serverRequestService.getGateways().then(function (response) {

      $scope.gatewayList = response.data;
      console.log ( $scope.selectedSortType.query);

      return  serverRequestService.getAllSensors({query: $scope.selectedSortType.query});

    }).then(function (response) {
        $scope.sensors = response.data;
        $scope.animation = { animation: google.maps.Animation.DROP };
        if (!isRefresh) {
          $scope.map = {center: {latitude: $scope.sensors[0].latitude, longitude: $scope.sensors[0].longitude}, zoom: 10};
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
    if (!$scope.notSensor) {
      $scope.map = {center: {latitude: latitude, longitude: longitude}, zoom: 17};
      $scope.clickedMarkerGateway = null;
      $scope.clickedMarkerSensor = sensorId;
    }
    $scope.notSensor = false;
  }

  $scope.closeClick = function (sensorId) {
    $scope.clickedMarkerSensor = sensorId;
  }
    $scope.goToStatistics = function (index) {
      $scope.go('main.statistics', index);

    }
    $scope.goToMarkerGateway = function (latitude, longitude, sensorId, isGateway) {
      $scope.map = {center: {latitude: latitude, longitude: longitude}, zoom: 17};
      if (isGateway) {
      $scope.notSensor = true; }
      $scope.clickedMarkerSensor = null;
      $scope.clickedMarkerGateway = sensorId;
    }
    $scope.changeSortCombo = function (selectedSortType) {
      $scope.selectedSortType = selectedSortType;
      $scope.loadLocationTab(true);

    }








}]);
