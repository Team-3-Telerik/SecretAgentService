(function () {
    'use strict';

    function MessageController(identity, messageData, notifier ) {
        var vm = this;
        vm.identity = identity;

        vm.sendMesssage = function (message, sendMessageForm) {

            if (sendMessageForm.$valid) {
                var toUser = window.location.href.split('/');
                var name = toUser[5];
                console.log(message);
                messageData.sendMessage(name, message)
                    .then(
                        function (success) {
                            notifier.success("Message sent successfully!");
                            // window.location.href = "/messages/inbox";
                        },
                        function (error) {
                            notifier.error(error.message);
                        });
            }
            else {
                notifier.error('Please fill all required fields');
            }
        };
    }

    angular.module('app.controllers')
        .controller('MessageController', ['identity', 'messageData', 'notifier', MessageController]);
}());