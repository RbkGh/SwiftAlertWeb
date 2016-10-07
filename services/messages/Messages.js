(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Messages', Service);

    function Service($http) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain/api/v2"

        service.SendBulk = SendBulk;

        return service;

        function SendBulk(data, callback) {
            $http.post(ROOT+'/messages/bul', data)
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
