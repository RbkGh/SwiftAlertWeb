angular.module('swiftAlert')
    .controller('groupController', ['$location', 'Auth', 'Contacts', '$localStorage', '$timeout', '$stateParams', function ($location, Auth, Contacts, $localStorage, $timeout, $stateParams) {
        var gr = this;
        gr.params = $stateParams;
        gr.addGroupContact = addGroupContact;
        gr.addGroupContactConfirm = addGroupContactConfirm;

        initController();


        function initController() {
            Contacts.getGroupContacts(gr.params.groupid)
                .then(function (contacts) {
                    gr.contacts = contacts;
                    console.log(gr.contacts);
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
            console.info(JSON.stringify(data));
            Contacts.CreateGroupContact(data, function (response) {
                if (response) {
                    if (response.status == 11) {
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
            });

        }


    }]);
