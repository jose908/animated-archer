angular.module('MainModule').controller('HomeController', ['$scope', '$http', '$window','serverRequestService', function ($scope, $http, $window, serverRequestService) {

  $scope.currentPage = 1;
  $scope.numPerPage = 7;

  $scope.loadData = function () {

    serverRequestService.getDailyReport().then( function (reponse) {

      $scope.reportData = reponse.data;


    });

  }



}]);
