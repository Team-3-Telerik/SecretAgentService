(function () {
    'use strict';

    function MessageController(identity, messageData, notifier ) {
        var vm = this;
        vm.identity = identity;

        if (identity.currentUser) {
            vm.message = {
                from: identity.currentUser._id
            };
        }

        vm.sendMesssage = function (message) {
            var toId = window.location.href.split('/');
            console.log(toId);
            message.to = toId[5];
            console.log(message);
            messageData.sendMessage(message)
                .then(function () {
                    notifier.success('Message sent successfully');
                    setInterval(function () {
                        // window.location.href = "/";
                    }, 500)
                })
        };
    }

    angular.module('app.controllers')
        .controller('MessageController', ['identity', 'messageData', 'notifier', MessageController]);
}());