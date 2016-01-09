(function(){
    'use strict';

    function missionsData(data) {
        function addMission(mission) {
            return data.post('missions/add', mission)
        }
        function acceptMission(missionId, user) {
          return data.post('missions/details/' + missionId, user)
        }

        return {
            addMission: addMission,
            acceptMission: acceptMission
        }
    }

    angular.module('app.services')
        .factory('missionsData', ['data' , missionsData])
}());