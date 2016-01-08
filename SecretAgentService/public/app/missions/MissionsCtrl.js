(function () {
    'use strict';

    function MissionsCtrl(identity) {
        var vm = this;
        vm.identity = identity;

        vm.mission = {
            postedBy : identity.currentUser.username
        };
        vm.addMission = function (mission) {
            console.log(mission);
        }

    }

    angular.module('app.controllers')
        .controller('MissionsCtrl', ['identity', MissionsCtrl]);
}());