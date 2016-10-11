angular.module('swiftAlert')
    .controller('groupsController', ['$location', 'Auth', 'Groups', '$localStorage', '$timeout', function($location, Auth, Groups, $localStorage, $timeout) {
        var grp = this;
        initController();
        grp.editGroup = editGroup;
        grp.deleteGroup = deleteGroup;
        grp.editGroupConfirm = editGroupConfirm;

        function initController() {
            Groups.get($localStorage.currentUser.userName)
                .then(function (groups) {
                   grp.groups = groups;
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function editGroup($event) {
            grp.groupToBeEditedId = $($event.currentTarget).attr('data-groupid');
            // console.log(grp.groupToBeEditedId );
            grp.groupToBeEditedName = $($event.currentTarget).attr('data-groupname');
            $('#editGroup').modal('show');
        };
        function editGroupConfirm($event) {
            data = {
                id: $localStorage.currentUser.userId,
                userName: $localStorage.currentUser.userName,
                groupId: grp.groupToBeEditedId,
                groupName: grp.groupToBeEditedName,
                dateCreated: moment().format()
            }

            Groups.update(data)
                .then(function (response) {
                    if (response.status == 11) {
                        console.log(response);
                        grp.emessage = response.message;
                    } else {
                        grp.smessage = response.message;
                    }
                    $('#editGroup').modal('hide');

                })
                .catch(function(response) {
                    grp.emessage = 'An error occured try again';
                    grp.sending = false;
                });
        };
        function deleteGroup($event) {
            grp.groupToBeDeletedId = $($event.currentTarget).attr('data-groupid');
            grp.groupToBeDeletedName = $($event.currentTarget).attr('data-groupname');
            $('#deleteGroup').modal('show');
        };
        function deleteGroupConfirm($event) {

        };
    }]);
