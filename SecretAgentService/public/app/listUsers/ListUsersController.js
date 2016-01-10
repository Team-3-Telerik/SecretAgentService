(function () {
    'use strict';

    function ListUsersController(identity, listUsersData, notifier) {
        var vm = this;
        vm.identity = identity;

        vm.deleteUser = function(event) {
            var userId = event.target.getAttribute('data-value');
            var adress = event.target.getAttribute('data-adress');
            console.log(event);
            listUsersData.deleteUser(userId)
                .then(function (data) {
                    notifier.success('You have deleted this user successfully');
                    setInterval(function () {
                        window.location.href = "/users/" + adress;
                    }, 500);
                })
        };
    }

    angular.module('app.controllers')
        .controller('ListUsersController', ['identity', 'listUsersData', 'notifier', ListUsersController]);

}());