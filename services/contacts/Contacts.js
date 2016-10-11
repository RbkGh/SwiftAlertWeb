(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Contacts', Contacts);

    function Contacts($http) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain/api/v2"

        service.CreateGroupContact = CreateGroupContact;
        service.CreateMultipleGroupContact = CreateMultipleGroupContact;
        service.getGroupContacts = getGroupContacts;

        return service;

        function getGroupContacts(groupId) {
            return $http({
                        method: 'GET',
                        url: ROOT+'/contacts/'+groupId,
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

        function CreateGroupContact(data, callback) {
            $http.post(ROOT+'/contacts/contact', data)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    }
                }).
                error(function (err){
                    callback(false);
                });
        }
        function CreateMultipleGroupContact(data, callback) {
            $http.post(ROOT+'/contacts', data)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    }
                }).
                error(function (err){
                    callback(false);
                });
        }

        function UpdateSingleGroupContact(data, callback) {
            $http.put(ROOT+'/contacts/contact/', data)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    }
                }).
                error(function (err){
                    callback(false);
                });
        }

        function DeleteSingleGroupContact(contactId, callback) {
            $http.delete(ROOT+'/contacts/contact/' + contactId)
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
