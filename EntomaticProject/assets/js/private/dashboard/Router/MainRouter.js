angular.module('MainModule').config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/main/home");

  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: '/views/main.html',
      controller: 'MainController'
    })
    .state('main.home', {
      url: "/home",
      templateUrl: '/views/home.html',
      controller: 'HomeController'
    })
    .state('main.sensorLocation', {
      url: "/sensorLocation",
      params: {
        param: 'noSensor'
      },
      templateUrl: '/views/sensorLocation.html',
      controller: 'SensorLocationController'
    })
    .state('main.statistics', {
      url: '/statistics',
      params: {
        param: 'noSensor'
      },
      templateUrl: '/views/statistics.html',
      controller:'StatisticsController'
    })
    .state('main.alarms', {
      url: '/alarms',
      params: {
        param: 'noSensor'
      },
      templateUrl: '/views/alarms.html',
      controller:'AlarmController'
    })
    .state('main.config', {
      url: '/config',
      templateUrl: '/views/config.html',
      controller:'ConfigController'
    })


});
