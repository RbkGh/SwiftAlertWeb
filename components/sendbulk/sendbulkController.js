angular.module('swiftAlert')
    .controller('sendbulkController', ['$location', 'Auth', 'Groups', 'Messages', '$localStorage', '$timeout', function($location, Auth, Groups, Messages, $localStorage, $timeout) {
        var sb = this;

        sb.send = send;

        initController();

        function initController() {
            Groups.get($localStorage.currentUser.userName)
                .then(function (groups) {
                   sb.groups = groups;
                   sb.groupid = sb.groups[0].groupId;
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function send() {
            sb.sending = true;
            var data = {
                userName: $localStorage.currentUser.userName,
                groupId: sb.groupid,
                senderId: sb.senderid,
                message: sb.message,
            }
            Messages.SendBulk(data, function (response) {
                if (response) {
                    sb.sending = false;
                    sb.response = response;
                    sb.smessage = response.message;

                    $timeout(function(){
                        $('.alert').alert('close');
                    }, 5000);
                } else {
                    sb.emessage = 'An error occured try again';
                    sb.sending = false;
                    $timeout(function(){
                        $('.alert').alert('close');
                    }, 5000);
                }
            });
        };
    }]);
