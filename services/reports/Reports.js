(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Reports', Reports);

    function Reports($http) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain/api/v2"

        service.GetAll = GetAll;
        service.GetByMessageId = GetByMessageId;

        return service;

        function get(userName) {
            return $http({
                        method: 'GET',
                        url: ROOT+'/messages/reports/'+userName,
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
        function GetByMessageId(messageid, callback) {
            $http.get(ROOT+'/messages/report/detailed/'+messageid)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    }
                }).
                error(function (err){
                    callback(false);
                });
        }
    }
})();
