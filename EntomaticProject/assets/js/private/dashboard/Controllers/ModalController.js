angular.module('MainModule').controller('ModalController', function ($scope, $modalInstance, title, body) {

  $scope.title = title;
  $scope.body = body;

  $scope.ok = function () {
    $modalInstance.close();
  };
});
