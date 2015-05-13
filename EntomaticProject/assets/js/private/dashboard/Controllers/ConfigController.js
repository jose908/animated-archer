angular.module('MainModule').controller('ConfigController', ['$scope', '$http', '$window','$modal', 'serverRequestService', function ($scope, $http, $window, $modal, serverRequestService) {

  $scope.user = [];
  $scope.user.isAdmin = false;

  $scope.newUser = function () {

    serverRequestService.newUser({user: $scope.user.name,
        password: $scope.user.password,
        isAdmin: $scope.user.isAdmin}
    ).success(function (data) {

        newModal('New user created successfully', 'User id:' + data.id);
        $scope.user = [];

      }

    ).error(function (data) {

        newModal('Error creating user', data);

      });

  }

  $scope.newMeasurementType = function () {

    serverRequestService.newMeasurementType({name: $scope.MeasurementType.name,
        shortName: $scope.MeasurementType.shortName,
        units: $scope.MeasurementType.units}
    ).success(function (data) {

        newModal('New MeasurementType created successfully', 'measurementTypeId:' + data.measurementTypeId);
        $scope.MeasurementType = [];

      }

    ).error(function (data) {

        newModal('Error creating Measurement Type', data);

      });

  }

  $scope.newAlarmType = function () {
    serverRequestService.newAlarmType({name: $scope.AlarmType.name,
        shortName: $scope.AlarmType.shortName}
    ).success(function (data) {

        newModal('New AlarmType created successfully', 'alarmTypeID:' + data.alarmTypeId);
        $scope.MeasurementType = [];

      }

    ).error(function (data) {

        newModal('Error creating Measurement Type', data);

      });

  }




  newModal = function (title, body,size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/modal.html',
      controller: 'ModalController',
      size: size,
      resolve: {
        title: function () {
          return title;
        },
        body: function () {
          return body;
        }
      }
    });

  }

}]);
