angular.module('MainModule').controller('StatisticsController', ['$scope', '$http', '$window','serverRequestService','$stateParams', function ($scope, $http, $window, serverRequestService,$stateParams) {

  $scope.periodTypes = [{name:'Today', count: 0},{name:'Yesterday', count: 1}, {name:'Last 7 days', count: 7}, {name:'Last 30 days',count: 30},{name: 'Custom Date'} ];
  $scope.severalSensors = false;
  $scope.multipleSensorsList = [];
  $scope.measurementsTable = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 7;

  var sensorsToFind = [];
  var initialInit= true;

  io.socket.on("measurement", function ServerSentEvent (event) {
    getMeasumentsData();

  });

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
      .then(function (response) {
        $scope.sensors = response.data;
         if ($stateParams.param != "noSensor") {

           var index;
           for (var i in $scope.sensors) {

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
      return serverRequestService.getAllMeasurementTypes();
      })
      .then(function (response) {
        $scope.measurementTypes = response.data;
        $scope.selectedMeasurement =  $scope.measurementTypes[0];
        $scope.selectedPeriodType = $scope.periodTypes[1];
        //We use this socket connection to get subscribed to the event of new measurement
        io.socket.get('/getAllMeasurement', function (body, response) {});
      }).then(function () {

        getMeasumentsData();

      });

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

    if ($scope.severalSensors) {

      for (var i in $scope.selectedMultipleNodes) {

        sensorsToFind.push($scope.selectedMultipleNodes[i].sensorId);
      }

    }
    else {
      sensorsToFind.push ($scope.selectedNode.sensorId);

    }

    serverRequestService.getSelectedMeasurement({sensorId: sensorsToFind, measurementTypeId: $scope.selectedMeasurement.measurementTypeId, from: from , to: to })
      .success(function (data, status, headers, config) {

        $scope.measurementsTable = data;

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
          initialInit = false;
          sensorsToFind = [];
        }
       else {

          cols= [];
          cols.push({id: 'createdAt', label: 'Created at', type: 'datetime'});

          for (var i in sensorsToFind) {
            cols.push({id: 'node', label:'Node ' +  sensorsToFind[i] , type: 'number'});

          }

          var rows = [];
          var aux = [];
         for (var i in data) {

           aux.push({v: new Date(data[i].createDate)});
           for (var j in sensorsToFind) {

             if (sensorsToFind[j] == data[i].sensorId) {

               aux.push({v: parseFloat(data[i].sensorReading)});

             }
             else {
               aux.push(null);
             }
           }
           rows.push ({c:aux});
           var aux = [];

         }

        $scope.chartObject = {
           "type": "LineChart",
           "displayed": true,
          "data": {
            "cols": cols,
            "rows": rows},
           "options": {
               "title": "Sensor readings",
             "interpolateNulls": true,
             "isStacked": "true",
             "fill": 20,
             "displayExactValues": true,
             chartArea: { top: 70, height: '80%' },
             "vAxis": {
               "title": $scope.selectedMeasurement.name + ' ('+ $scope.selectedMeasurement.units+ ')',
               "gridlines": {
                 "count": 12
               }
             },
             hAxis: {
               gridlines: {
                 count: -1,
                 units: {
                   days: {format: ["MMM dd"]},
                   hours: {format: ["HH:mm", "ha"]}
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
          initialInit = false;
          sensorsToFind = [];
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

  $scope.$watch('selectedMultipleNodes', function() {

    if(!initialInit) {
      getMeasumentsData();
    }
  });

  $scope.getMultipleMeasurements = function() {

    getMeasumentsData();

  }
  $scope.goToAlarms = function (index) {
    $scope.go('main.alarms', index);

  }





}]);
