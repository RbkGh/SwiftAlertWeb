angular.module('swiftAlert')
    .controller('groupController', ['$location', 'Auth', 'Contacts', 'Groups', '$localStorage', '$timeout', '$stateParams', function ($location, Auth, Contacts, Groups, $localStorage, $timeout, $stateParams) {
        var gr = this;
        gr.params = $stateParams;

        gr.addGroupContact = addGroupContact;
        gr.addGroupContactConfirm = addGroupContactConfirm;

        gr.uploadContacts = uploadContacts;
        gr.uploadContactsConfirm = uploadContactsConfirm;

        gr.editContact = editContact;
        gr.editContactConfirm = editContactConfirm;

        gr.deleteContact = deleteContact;
        gr.deleteContactConfirm = deleteContactConfirm;

        gr.contactsListRaw = [];


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
                    gr.groups.filter(function (group) {
                        if (group.groupId == gr.params.groupid) {
                            gr.group = group;
                            return group;
                        }
                    });
                })
                .catch(function (response) {
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
                    gr.emessage = 'An error occured try again';
                    gr.sending = false;
                    initController();
                    $timeout(function () {
                        gr.emessage = '';
                        gr.smessage = '';
                    }, 7000);
                });
        }

        function editContact($event) {
            gr.contactToBeEditedFirstName = $($event.currentTarget).attr('data-firstname');
            gr.contactToBeEditedLastName = $($event.currentTarget).attr('data-lastname');
            gr.contactToBeEditedPhoneNumber = $($event.currentTarget).attr('data-phonenumber');
            gr.contactToBeEditedId = $($event.currentTarget).attr('data-contactid');
            $('#editContact').modal('show');
        }

        function editContactConfirm() {
            var data = {
                id: gr.contactToBeEditedId,
                firstName: gr.contactToBeEditedFirstName,
                lastName: gr.contactToBeEditedLastName,
                contactPhoneNum: gr.contactToBeEditedPhoneNumber,
                groupId: gr.params.groupid
            }

            Contacts.update(data)
                .then(function (response) {
                    if (response.status == 11) {
                        gr.emessage = response.message;
                    } else {
                        gr.smessage = response.message;
                    }
                    $('#editContact').modal('hide');
                    initController();
                    $timeout(function () {
                        gr.emessage = '';
                        gr.smessage = '';
                    }, 7000);
                })
                .catch(function (response) {
                    $('#editContact').modal('hide');
                    gr.emessage = 'An error occured try again';
                    gr.sending = false;
                    initController();
                    $timeout(function () {
                        gr.emessage = '';
                        gr.smessage = '';
                    }, 7000);
                });
        }

        function deleteContactConfirm() {

            Contacts.remove(gr.contactToBeDeletedId)
                .then(function (response) {
                    if (response.status == 11) {
                        gr.emessage = response.message;
                    } else {
                        gr.smessage = response.message;
                    }
                    $('#deleteContact').modal('hide');
                    initController();
                    $timeout(function () {
                        gr.emessage = '';
                        gr.smessage = '';
                    }, 7000);
                })
                .catch(function (response) {
                    $('#deleteContact').modal('hide');
                    gr.emessage = 'An error occured try again';
                    gr.sending = false;
                    initController();
                    $timeout(function () {
                        gr.emessage = '';
                        gr.smessage = '';
                    }, 7000);
                });
        }

        function deleteContact($event) {
            gr.contactToBeDeletedFirstName = $($event.currentTarget).attr('data-firstname');
            gr.contactToBeDeletedLastName = $($event.currentTarget).attr('data-lastname');
            gr.contactToBeDeletedPhoneNumber = $($event.currentTarget).attr('data-phonenumber');
            gr.contactToBeDeletedId = $($event.currentTarget).attr('data-contactid');
            $('#deleteContact').modal('show');
        }

        function uploadContacts() {
            $('#uploadContacts').modal('show');
        }

        function uploadContactsConfirm() {
            requestData = {
                groupId: gr.params.groupid,
                userName: $localStorage.currentUser.userName,
                contactsList: gr.contactsListRaw
            };
            console.log("FullRequest=" + JSON.stringify(requestData));
            Contacts.addMultipleGroupContacts(requestData).then(function (response) {
                if (response.status == 11) {
                    gr.emessage = response.message;
                } else {
                    gr.smessage = response.message;
                }
                $('#uploadContacts').modal('hide');
                initController();
                $timeout(function () {
                    gr.emessage = '';
                    gr.smessage = '';
                }, 7000);
            })
                .catch(function (response) {
                    $('#uploadContacts').modal('hide');
                    gr.emessage = 'An error occured try again';
                    gr.sending = false;
                    initController();
                    $timeout(function () {
                        gr.emessage = '';
                        gr.smessage = '';
                    }, 7000);
                });


        }
    }]);
