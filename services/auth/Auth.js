(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Auth', Service);

    function Service($http, $localStorage) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain"

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
            $http.post(ROOT+'/auth', { userName: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response && response.responseObject && response.responseObject.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = response.responseObject;

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.responseObject.token;
                        // $http.defaults.headers.common.Accept = 'application/x-www-form-urlencoded';

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();
