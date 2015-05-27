angular.module('MainModule').controller('AlarmController', ['$scope', '$http', '$window','serverRequestService','$stateParams', function ($scope, $http, $window,serverRequestService, $stateParams) {

  /*LOCATION TAB */

  $scope.currentPage = 1;
  $scope.numPerPage = 7;
  $scope.openNew =true;


  $scope.initFunction = function () {

    serverRequestService.getUnviewedAlarms()
      .then(function (response) {

        $scope.unViewedAlarms = response.data;
        return serverRequestService.getAllSensors();

      }).then(function (response){

        $scope.sensors = response.data;
        $scope.sensors.push({sensorId:null});

        if ($stateParams.param != "noSensor") {

          var index;
          for (var i in $scope.sensors) {

            $scope.openNew= false;
            if ($scope.sensors[i].sensorId == $stateParams.param) {

              index = i;
              break;
            }

          }

          $scope.selectedNode = $scope.sensors[index];
        }
        else {
          $scope.selectedNode = $scope.sensors[0];
        }
        return serverRequestService.getAlarmTypes();
      })
      .then(function (response) {
        $scope.alarmTypes = response.data;
        $scope.selectedAlarmType =  $scope.alarmTypes[0];

      }).then(function () {

        getAlarmsData();

      });



  }

      getAlarmsData = function() {

        serverRequestService.getSelectedAlarms({sensorId: $scope.selectedNode.sensorId, alarmTypeId: $scope.selectedAlarmType.alarmTypeId}).then (function (response) {
          $scope.alarms =response.data;
          console.log(response.data)


        });






      }


  $scope.markAsViewed = function (index,alarmId) {


    serverRequestService.setViewedAlarm(alarmId)
      .success(function() {

        $scope.unViewedAlarms.splice(index, 1);

      });

  }

  $scope.viewMap =function(sensor) {
    $scope.go('main.sensorLocation',JSON.stringify(sensor));

  }
  $scope.goToStatistics = function (sensor) {
    $scope.go('main.statistics', sensor);

  }

  $scope.changeSensorCombo = function() {

    getAlarmsData();


  }
  $scope.changeAlarmTypeCombo = function() {

    getAlarmsData();



  }





}]);
