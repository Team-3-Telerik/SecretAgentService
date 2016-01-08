(function () {
    'use strict';

    function MissionController(identity, missionsData, notifier) {
        var vm = this;
        vm.identity = identity;

        if(identity.currentUser){
            vm.mission = {
                postedBy : identity.currentUser.username
            };
        }

        vm.addMission = function (mission) {
            missionsData.addMission(mission)
                .then(function () {
                    notifier.success('Mission add successfully');
                    setInterval(function () {
                        window.location.href = "/missions";
                    }, 1000)
                })
        }
    }

    angular.module('app.controllers')
        .controller('MissionController', ['identity', 'missionsData', 'notifier', MissionController]);
}());