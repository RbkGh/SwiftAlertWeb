angular.module('swiftAlert')
    .controller('groupController', ['$location', 'Auth', 'Contacts', '$localStorage', '$timeout', '$stateParams', function($location, Auth, Contacts, $localStorage, $timeout, $stateParams) {
        var gr = this;
        gr.params = $stateParams;
        initController();


        function initController() {
            Contacts.getGroupContacts(gr.params.groupid)
                .then(function (contacts) {
                   gr.contacts = contacts;
                   console.log(gr.contacts);
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };
    }]);
