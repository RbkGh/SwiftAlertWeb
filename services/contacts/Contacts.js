(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Contacts', Contacts);

    function Contacts($http) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain/api/v2"



        service.getGroupContacts = getGroupContacts;
        service.createGroupContact = createGroupContact;
        service.addMultipleGroupContacts = addMultipleGroupContacts;
        service.update = update;
        service.remove = remove;

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

        function createGroupContact(data) {
            return $http({
                        method: 'POST',
                        url: ROOT+'/contacts/contact',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data:data
                }).then(
                    function success(response) {
                        return response.data;
                    },
                    function fail(e) {
                      console.log(e);
                        return e;
                });
        }
        function addMultipleGroupContacts(data) {
            return $http({
                        method: 'POST',
                        url: ROOT+'/contacts',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data:data
                }).then(
                    function success(response) {
                        return response.data;
                    },
                    function fail(e) {
                      console.log(e);
                        return e;
                });
        }

        function update(data) {
            return $http({
                        method: 'PUT',
                        url: ROOT+'/contacts/contact',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data:data
                }).then(
                    function success(response) {
                        return response.data;
                    },
                    function fail(e) {
                      console.log(e);
                        return e;
                });
        }

        function remove(contactId) {
            return $http({
                        method: 'DELETE',
                        url: ROOT+'/contacts/contact/' + contactId,
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
    }
})();
