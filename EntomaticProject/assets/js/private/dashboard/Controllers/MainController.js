//Controller for managing the index app

angular.module('MainModule').controller('MainController', ['$scope', '$http', '$window', '$state', function ($scope, $http, $window, $state) {

  //hack for making the tabs work with the router
  $scope.tabs = [
    {route: "main.home", active: false},
    {route: "main.sensorLocation", active: false},
    {route: "main.stadistics", active: false},
    {route: "main.alarms", active: false},
    {route: "main.config", active: false}
  ];


  //hack for making the tabs work -tab switching
  $scope.go = function (route,loc) {
     $state.go(route, {param: loc});
  };

  $scope.active = function (route) {
    return $state.is(route);
  };

  $scope.$on("$stateChangeSuccess", function () {
    $scope.tabs.forEach(function (tab) {
      tab.active = $scope.active(tab.route);
    });
  });

  //Capture changes (e.g new sensors)
  io.socket.on("alarm", function (event) {

    $scope.getInitValues();

  });

  //Get user info and other stuff when the web page loads
  $scope.getInitValues = function () {

    io.socket.get('/getInitValues', function (body, response) {
      $scope.initValues = body;
      $scope.$apply();
    });
  }


}]);





