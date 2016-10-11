angular.module('swiftAlert')
    .controller('groupsController', ['$location', 'Auth', 'Groups', '$localStorage', '$timeout', function($location, Auth, Groups, $localStorage, $timeout) {
        var grp = this;
        initController();
        grp.editGroup = editGroup;
        grp.editGroupConfirm = editGroupConfirm;
        grp.addGroup = addGroup;
        grp.addGroupConfirm = addGroupConfirm;

        function initController() {
            Groups.get($localStorage.currentUser.userName)
                .then(function (groups) {
                   grp.groups = groups;
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function addGroup() {
            $('#addGroup').modal('show');
        }
        function addGroupConfirm() {
            data = {
                userName: $localStorage.currentUser.userName,
                groupName: grp.groupToBeAddeddName
            }

            Groups.create(data)
                .then(function (response) {
                    if (response.status == 11) {
                        grp.emessage = response.message;
                    } else {
                        grp.smessage = response.message;
                    }
                    $('#addGroup').modal('hide');
                    initController()
                })
                .catch(function(response) {
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                    initController()
                });
        }

        function editGroup($event) {
            grp.groupToBeEditedId = $($event.currentTarget).attr('data-groupid');
            // console.log(grp.groupToBeEditedId );
            grp.groupToBeEditedName = $($event.currentTarget).attr('data-groupname');
            grp.dateCreated = $($event.currentTarget).attr('data-datecreated');
            grp.id = $($event.currentTarget).attr('data-id');
            $('#editGroup').modal('show');
        };
        function editGroupConfirm($event) {
            data = {
                id: grp.id,
                userName: $localStorage.currentUser.userName,
                groupId: grp.groupToBeEditedId,
                groupName: grp.groupToBeEditedName,
                dateCreated: grp.dateCreated
            }

            Groups.update(data)
                .then(function (response) {
                    if (response.status == 11) {
                        grp.emessage = response.message;
                    } else {
                        grp.smessage = response.message;
                    }
                    $('#editGroup').modal('hide');
                    initController()
                })
                .catch(function(response) {
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                    initController()
                });
        };
        function deleteGroup($event) {
            grp.groupToBeDeletedId = $($event.currentTarget).attr('data-groupid');
            grp.groupToBeDeletedName = $($event.currentTarget).attr('data-groupname');
            grp.dateCreated = $($event.currentTarget).attr('data-datecreated');
            grp.id = $($event.currentTarget).attr('data-id');
            $('#deleteGroup').modal('show');
        };
        function deleteGroupConfirm($event) {
            console.info("data = "+JSON.stringify(data));
        };
    }]);
