(function () {
    'use strict';
    angular.module('swiftAlert')
        .run(['$rootScope', '$http', '$location', '$localStorage', '$state', function($rootScope, $http, $location, $localStorage, $state) {
            // keep user logged in after page refresh
            if ($localStorage.currentUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }
            $rootScope.$on('$stateChangeStart', function(evt, to, params) {
              if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params, {location: 'replace'})
              }
            });
            // redirect to login page if not logged in and trying to access a restricted page
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                var publicPages = ['/login'];
                var restrictedPage = publicPages.indexOf($location.path()) === -1;
                if (restrictedPage && !$localStorage.currentUser) {
                    $location.path('/login');
                }
            });
        }]);
 })();
