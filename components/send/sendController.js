angular.module('swiftAlert')
    .controller('sendController', ['$location', 'Auth', 'Messages', '$localStorage', '$timeout', function($location, Auth, Messages, $localStorage, $timeout) {
        var sb = this;

        sb.send = send;

        function send() {
            sb.sending = true;
            var data = {
                userName: $localStorage.currentUser.userName,
                senderId: sb.senderid,
                message: sb.message,
                recieverNum: sb.recievernumber
            }
            Messages.SendSingle(data, function (response) {
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
