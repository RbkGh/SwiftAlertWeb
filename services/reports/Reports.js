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

        function GetAll(userName, callback) {
            $http.get(ROOT+'/messages/report/'+userName)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    }
                }).
                error(function (err){
                    callback(false);
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
