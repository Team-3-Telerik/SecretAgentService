(function() {
    'use strict';

    function listUsersData(data) {

        function deleteUser(userId) {
            return data.del('users/' + userId)
        }

        return {
            deleteUser: deleteUser
        }

    }

    angular.module('app.services')
        .factory('listUsersData', ['data' , listUsersData])
}());