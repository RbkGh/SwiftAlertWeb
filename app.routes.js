(function () {
    'use strict';
    angular.module('swiftAlert')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'loginController',
                    controllerAs: 'si',
                    templateUrl: 'components/login/login.html'
                })
                .state('dash', {
                    url: '/',
                    controller: 'dashController',
                    controllerAs: 'dash',
                    templateUrl: 'components/dash/dash.html',
                    redirectTo: 'dash.sendbulk',
                })
                .state('dash.sendbulk', {
                    url: 'sendbulk',
                    controller: 'sendbulkController',
                    controllerAs: 'sb',
                    templateUrl: 'components/sendbulk/sendbulk.html'
                })
                .state('dash.send', {
                    url: 'send',
                    controller: 'sendController',
                    controllerAs: 'snd',
                    templateUrl: 'components/send/send.html'
                })
                .state('dash.groups', {
                    url: 'groups',
                    controller: 'groupsController',
                    controllerAs: 'grp',
                    templateUrl: 'components/groups/groups.html'
                })
                .state('dash.reports', {
                    url: 'reports',
                    controller: 'reportsController',
                    controllerAs: 'rep',
                    templateUrl: 'components/reports/reports.html'
                })
                .state('dash.settings', {
                    url: 'settings',
                    controller: 'settingsController',
                    controllerAs: 'sett',
                    templateUrl: 'components/settings/settings.html'
                });

              $locationProvider.html5Mode(true);
              $urlRouterProvider.otherwise("/");
        }]);
 })();
