(function () {
    'use strict';

    function ListUsersController(identity, listUsersData, notifier) {
        var vm = this;
        vm.identity = identity;



    }


    angular.module('app.controllers')
        .controller('ListUsersController', ['identity', 'listUsersData', 'notifier', ListUsersController]);

}());