(function () {
    'use strict';

    function messageData(data) {

        function sendMessage(userName, message) {
            return data.post('messages/send/' + userName, message)
        }

        return {
            sendMessage: sendMessage
        }
    }

    angular.module('app.services')
        .factory('messageData', ['data', messageData])
}());