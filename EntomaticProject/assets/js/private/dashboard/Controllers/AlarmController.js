angular.module('MainModule').controller('AlarmController', ['$scope', '$http', '$window','serverRequestService', function ($scope, $http, $window,serverRequestService) {

  /*LOCATION TAB */

  $scope.currentPage = 1;
  $scope.numPerPage = 7;


  $scope.initFunction = function () {

    serverRequestService.getUnviewedAlarms()
      .success(function (data, status, headers, config) {

        $scope.unViewedAlarms = data;

        });

  }

  $scope.markAsViewed = function (index,alarmId) {


    serverRequestService.setViewedAlarm(alarmId)
      .success(function() {

        $scope.unViewedAlarms.splice(index, 1);

      });

  }




}]);
