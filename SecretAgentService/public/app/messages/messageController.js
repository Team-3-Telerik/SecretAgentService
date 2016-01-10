(function () {
    'use strict';

    function MessageController(identity, messageData, notifier) {
        var vm = this;
        vm.identity = identity;

        if (identity.currentUser) {
            vm.message = {
                postedBy: identity.currentUser.username
            };
        }

        vm.sendMesssage = function (message) {
            messageData.sendMessage(message)
                .then(function () {
                    notifier.success('Message sent successfully');
                    setInterval(function () {
                        window.location.href = "/";
                    }, 500)
                })
        };
    }

    angular.module('app.controllers')
        .controller('MessageController', ['identity', 'messageData', 'notifier', MessageController]);
}());