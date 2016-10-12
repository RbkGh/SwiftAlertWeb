(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Reports', Reports);

    function Reports($http) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain/api/v2"

        service.get = get;
        service.getDetailed = getDetailed;

        return service;

        function get(userName) {
            return $http({
                        method: 'GET',
                        url: ROOT+'/messages/report/'+userName,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data:{}
                }).then(
                    function success(response) {
                        return response.data.responseObject;
                    },
                    function fail(e) {
                      console.log(e);
                        return e;
                });
        }
        function getDetailed(messageid) {
            return $http({
                        method: 'GET',
                        url: ROOT+'/messages/report/detailed/'+messageid,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data:{}
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
