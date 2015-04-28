angular.module('MainModule').factory('serverRequestService', ['$http', function($http) {

  var dataFactory = {};

  dataFactory.getAllSensors = function () {
    return $http.get('/getSensors');
  };
  dataFactory.getAllMeasurementTypes = function () {
    return $http.get('/getMeasurementTypes');
  };
  dataFactory.getSelectedMeasurement = function (param) {
    return $http.get('/getSelectedMeasurement',{params: param});
  };
  dataFactory.getUnviewedAlarms = function (param) {
    return $http.get('/getUnviewedAlarms',{params: param});
  };
  dataFactory.setViewedAlarm = function (param) {
    return $http.put('/setViewedAlarm',{params: param});
  };

  return dataFactory;


}]);
