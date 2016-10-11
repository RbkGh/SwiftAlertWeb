angular.module('swiftAlert')
    .controller('groupsController', ['$location', 'Auth', 'Groups', '$localStorage', '$timeout', function($location, Auth, Groups, $localStorage, $timeout) {
        var grp = this;
        initController();
        grp.editGroup = editGroup;
        grp.editGroupConfirm = editGroupConfirm;
        grp.addGroup = addGroup;
        grp.addGroupConfirm = addGroupConfirm;
        grp.uploadGroups = uploadGroups;
        grp.uploadGroupsConfirm = uploadGroupsConfirm;
        grp.deleteGroup = deleteGroup;
        grp.deleteGroupConfirm = deleteGroupConfirm;

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
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
                })
                .catch(function(response) {
                    $('#addGroup').modal('hide');
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
                });
        }

        function editGroup($event) {
            grp.groupToBeEditedId = $($event.currentTarget).attr('data-groupid');
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
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
                })
                .catch(function(response) {
                    $('#editGroup').modal('hide');
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
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
            data = {
                id: grp.id,
                userName: $localStorage.currentUser.userName,
                groupId: grp.groupToBeDeletedId,
                groupName: grp.groupToBeDeletedName,
                dateCreated: grp.dateCreated
            }

            Groups.remove(data)
                .then(function (response) {
                    if (response.status == 11) {
                        grp.emessage = response.message;
                    } else {
                        grp.smessage = response.message;
                    }
                    $('#deleteGroup').modal('hide');
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
                })
                .catch(function(response) {
                    $('#deleteGroup').modal('hide');
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                    initController();
                    $timeout(function(){
                        grp.emessage = '';
                        grp.smessage = '';
                    }, 7000);
                });
        }

        function uploadGroups($event) {
            $('#uploadGroups').modal('show');
        };
        function uploadGroupsConfirm() {
        };
    }]);
