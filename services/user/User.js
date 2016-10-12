(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('User', User);

    function User($http, $localStorage) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain/api/v2/user"

        service.get = get;
        service.changePassword = changePassword;

        return service;

        function get() {
            return $http({
                        method: 'GET',
                        url: ROOT+'/'+$localStorage.currentUser.userId,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: {}
                }).then(
                    function success(response) {
                        return response.data;
                    },
                    function fail(e) {
                      console.log(e);
                        return e;
                });
        }

        function changePassword(data) {
            return $http({
                        method: 'PUT',
                        url: ROOT+'/passwordchange',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data: data
                }).then(
                    function success(response) {
                        return response.data;
                    },
                    function fail(e) {
                      console.log(e);
                        return e;
                });
        }
    }
})();
