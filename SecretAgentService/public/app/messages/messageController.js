(function () {
    'use strict';

    function MessageController(identity, messageData, notifier ) {
        var vm = this;
        vm.identity = identity;

        vm.sendMesssage = function (message, sendMessageForm) {

            if (sendMessageForm.$valid) {
                var toUser = window.location.href.split('/');
                var name = toUser[5];

                messageData.sendMessage(name, message)
                    .then(
                        function (success) {
                            notifier.success("Message sent successfully!");
                            setInterval(function () {
                                window.location.href = "/messages/outbox";
                            }, 500);
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