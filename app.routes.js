angular.module('swiftAlert')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {



        var homeState = {
            name: 'home',
            url: '/',
            controller: 'homeController',
            templateUrl: 'components/home/home.html'
         }

         var loginState = {
             name: 'login',
             url: '/login',
             controller: 'loginController',
             templateUrl: 'components/login/login.html'
          }

          $locationProvider.html5Mode(true);
          $stateProvider.state(homeState);
          $stateProvider.state(loginState);
          $urlRouterProvider.otherwise("/");
    }]);
