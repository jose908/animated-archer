angular.module('MainModule').controller('StadisticsController', ['$scope', '$http', '$window','serverRequestService','$stateParams', function ($scope, $http, $window, serverRequestService,$stateParams) {

  $scope.viewMap =function() {
       $scope.go('main.sensorLocation',JSON.stringify($scope.selectedNode));

  }
  $scope.dateSelection = false;

  $scope.changePeriodCombo =function() {

    if ($scope.selectedPeriodType.name == 'Custom Date') {
      $scope.dateSelection = true;
    }
    else {

      $scope.dateSelection = false;

    }
    getMeasumentsData();

  }
    $scope.loadCombos = function () {
    serverRequestService.getAllSensors()
      .success(function (data, status, headers, config) {
        data.unshift({sensorId:'All'});
        $scope.sensors = data;
         if ($stateParams.param != "noSensor") {
          $scope.selectedNode = $scope.sensors[$stateParams.param + 1];
        }
        else {
          $scope.selectedNode = $scope.sensors[1];
        }


      }).then(
    serverRequestService.getAllMeasurementTypes()
      .success(function (data, status, headers, config) {
        $scope.measurementTypes = data;
        $scope.selectedMeasurement =  $scope.measurementTypes[0];
        $scope.periodTypes = [{name:'Today', count: 0},{name:'Yesterday', count: 1}, {name:'Last 7 days', count: 7}, {name:'Last 30 days',count: 30},{name: 'Custom Date'} ];
        $scope.selectedPeriodType = $scope.periodTypes[2];
        getMeasumentsData();
      }));

    }

  $scope.changeSensorCombo =function() {

    getMeasumentsData();

  }
  $scope.changeMeasurementCombo =function() {

    getMeasumentsData();

  }
   //gets measurements for selected options
  getMeasumentsData = function() {

    if($scope.selectedPeriodType.name  == 'Custom Date' ) {

      from = moment(new Date ($scope.fromDate)).startOf('day')._d;
      to = moment (new Date ($scope.toDate)).endOf('day')._d;
    }
    else {

      from = moment().subtract($scope.selectedPeriodType.count, 'days').startOf('day')._d;
      to = moment().endOf('day')._d;
      }

    serverRequestService.getSelectedMeasurement({sensorId: $scope.selectedNode.sensorId, measurementTypeId: $scope.selectedMeasurement.measurementTypeId, from: from , to: to })
      .success(function (data, status, headers, config) {

        if(data.length == 0) {


          cols = [{id: 'nodata', label: 'NO DATA', type: 'string'},
            {id: 'nodata', label: 'NO DATA', type: 'number'}];
          rows = [{c:[{v: 'NO DATA'}, {v: 0}]}];

         $scope.chartObject = {
           "type": "LineChart",
           "data": {
             "cols": cols,
             "rows": rows},
           "displayed": true,
           "options": {
             "title": "No data",
             "isStacked": "true",
             "fill": 20,
             "displayExactValues": true,
             legend : {position: 'none'},

           }
       }
        }
       else {

          cols = [{id: 'createdAt', label: 'Created at', type: 'datetime'},
            {id: 'node', label:'Node ' +  $scope.selectedNode.sensorId +' ' + $scope.selectedMeasurement.name , type: 'number'}];
          var rows = [];
         for (var i in data) {
           rows.push ({c:[{v: new Date(data[i].createDate)}, {v: parseFloat(data[i].sensorReading)}]});
         }

        $scope.chartObject = {
           "type": "LineChart",
           "displayed": true,
          "data": {
            "cols": cols,
            "rows": rows},
           "options": {
               "title": "Sensor readings",
             "isStacked": "true",
             "fill": 20,
             "displayExactValues": true,
             "vAxis": {
               "title": $scope.selectedMeasurement.name,
               "gridlines": {
                 "count": 12
               }
             },
             hAxis: {
               gridlines: {
                 count: -1,
                 units: {
                   days: {format: ["MMM dd"]},
                   hours: {format: ["HH:mm", "ha"]},
                 }
               },
               minorGridlines: {
                 units: {
                   hours: {format: ["hh:mm:ss a", "ha"]},
                   minutes: {format: ["HH:mm a Z", ":mm"]}
                 }
               }
             }
           },
           "formatters": {}

         }
       }

      });

  }

  $scope.openTo = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedTo = true;
  };
  $scope.openFrom = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedFrom = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.fromDate = new Date();
  $scope.toDate =  new Date()

  $scope.selectDate = function() {
    getMeasumentsData();
  }




}]);
