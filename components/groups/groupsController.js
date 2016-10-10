angular.module('swiftAlert')
    .controller('groupsController', ['$location', 'Auth', 'Groups', '$localStorage', function($location, Auth, Groups, $localStorage) {
        var grp = this;
        initController();
        grp.editGroup = editGroup;
        grp.deleteGroup = deleteGroup;

        function initController() {
            Groups.getGroups($localStorage.currentUser.userName)
                .then(function (groups) {
                   grp.groups = groups;
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function editGroup(groupId, groupName) {
            console.log(groupId);
            grp.groupToBeEditeddName = groupName;
            $('#editGroup').modal('show');
        };

        function deleteGroup(groupId, groupName) {
            grp.groupToBeDeletedName = groupName;
            $('#deleteGroup').modal('show');
        };
    }]);
