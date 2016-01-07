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

    app.controller('MissionsCtrl', ['identity',MissionsCtrl])
}());