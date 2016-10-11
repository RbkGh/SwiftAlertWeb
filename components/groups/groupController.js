angular.module('swiftAlert')
    .controller('groupController', ['$location', 'Auth', 'Contacts', 'Groups', '$localStorage', '$timeout', '$stateParams', function ($location, Auth, Contacts, Groups, $localStorage, $timeout, $stateParams) {
        var gr = this;
        gr.params = $stateParams;
        gr.addGroupContact = addGroupContact;
        gr.addGroupContactConfirm = addGroupContactConfirm;
        gr.editContact = editContact;

        initController();
        getGroupInfo()
        function initController() {
            Contacts.getGroupContacts(gr.params.groupid)
                .then(function (contacts) {
                    gr.contacts = contacts;
                })
                .catch(function (response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function getGroupInfo() {
            Groups.get($localStorage.currentUser.userName)
                .then(function (groups) {
                   gr.groups = groups;
                   gr.groups.filter(function( group ) {
                       if (group.groupId == gr.params.groupid) {
                           gr.group = group;
                           return group;
                       }
                    });
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function addGroupContact() {
            $('#addGroupContact').modal('show');
        }

        function addGroupContactConfirm() {
            var data = {
                userName: $localStorage.currentUser.userName,
                groupId: gr.params.groupid,
                firstName: gr.firstNameInTemplate,
                lastName: gr.lastNameInTemplate,
                contactPhoneNum: gr.phoneNumberInTemplate
            }
            Contacts.createGroupContact(data)
                .then(function (response) {

                    if (response) {
                        if (response.status == 11) {
                            console.log(response.message);
                            gr.emessage = response.message;
                        } else {
                            gr.smessage = response.message;
                        }
                        $('#addGroupContact').modal('hide');
                        initController();
                        $timeout(function () {
                            gr.emessage = '';
                            gr.smessage = '';
                        }, 7000);
                    } else {
                        $('#addGroupContact').modal('hide');
                        gr.emessage = 'An error occured try again';
                        gr.sending = false;
                        initController();
                        $timeout(function () {
                            gr.emessage = '';
                            gr.smessage = '';
                        }, 7000);
                    }
                })
                .catch(function (response) {
                    $('#addGroupContact').modal('hide');
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
                });
        }

        function editContact($event) {
            gr.contactToBeEditedFirstName = $($event.currentTarget).attr('data-firstname');
            gr.contactToBeEditedLastName = $($event.currentTarget).attr('data-lastname');
            gr.contactToBeEditePhoneNumber = $($event.currentTarget).attr('data-phonenumber');
            $('#editContact').modal('show');
        }

    }]);
