(function() {
    'use strict';

    function UserDetails(){

    }

    angular.module('app.controllers')
        .controller('UserDetailsController', ['identity', 'listUsersData', 'notifier', UserDetails]);

}());