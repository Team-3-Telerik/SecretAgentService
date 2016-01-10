(function () {
    'use strict';

    function ListUsersController(identity, listUsersData, notifier) {
        var vm = this;
        vm.identity = identity;

        vm.deleteUser = function(event) {
            var userId = event.target.getAttribute('data-value');
            console.log(event);
            listUsersData.deleteUser(userId)
                .then(function (data) {
                    notifier.success('You have deleted this user successfully');
                    window.location.href = "/";
                })
        };
    }

    angular.module('app.controllers')
        .controller('ListUsersController', ['identity', 'listUsersData', 'notifier', ListUsersController]);

}());