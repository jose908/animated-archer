angular.module('MainModule').factory('serverRequestService', ['$http', function($http) {

  var dataFactory = {};

  dataFactory.getAllSensors = function (param) {
    return $http.get('/getSensors', {params: param});
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
  dataFactory.newUser = function (param) {
    return $http.post('/signup',param);
  };
  dataFactory.newMeasurementType = function (param) {
    return $http.post('/newMeasurementType',param);
  };
  dataFactory.newAlarmType = function (param) {
    return $http.post('/newAlarmType',param);
  };
  dataFactory.getGateways = function (param) {
    return $http.get('/getGateways',{params: param});
  };
  dataFactory.getDailyReport = function (param) {
    return $http.get('/getDailyReport',{params: param});
  };
  dataFactory.getAlarmTypes = function (param) {
    return $http.get('/getAlarmTypes',{params: param});
  };
  dataFactory.getSelectedAlarms = function (param) {
    return $http.get('/getSelectedAlarms',{params: param});
  };


  return dataFactory;


}]);
