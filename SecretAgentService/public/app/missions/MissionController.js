(function () {
    'use strict';

    function MissionController(identity, missionsData, notifier) {
        var vm = this;
        vm.identity = identity;

        if (identity.currentUser) {
            vm.mission = {
                postedBy: identity.currentUser.username,
                agent: ''
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
        };
        vm.acceptMission = function () {
            var missionId = window.location.href.split('/')[5];
            missionsData.acceptMission(missionId, identity.currentUser)
                .then(function (mission) {
                    vm.currentMission = mission;
                    notifier.success('You accept mission successfully');
                })
        };

        vm.deleteMission = function(event) {
            var missionId = event.target.getAttribute('data-value');
            missionsData.deleteMission(missionId)
                .then(function (data) {
                    console.log(data);
                    notifier.success('You have deleted this mission successfully');
                })
        };
    }

    angular.module('app.controllers')
        .controller('MissionController', ['identity', 'missionsData', 'notifier', MissionController]);
}());