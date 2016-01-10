(function () {
    'use strict';

    function messageData(data) {

        function sendMessage(message) {
            return data.post('messages/send', message)
        }

        return {
            sendMessage: sendMessage
        }
    }

    angular.module('app.services')
        .factory('messageData', ['data', messageData])
}());