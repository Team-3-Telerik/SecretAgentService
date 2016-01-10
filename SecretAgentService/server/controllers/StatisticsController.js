var User = require('mongoose').model('User'),
    Mission = require('mongoose').model('Mission'),
    cachedAgents = 0,
    cachedCommissioners = 0,
    cachedMissions = 0;


module.exports = {
    getStatistics: function (req, res) {

        if(!cachedCommissioners){
            User
                .find({roles: ['Commissioner']})
                .exec(function (err, commissioners) {
                    if(err){
                        console.log('Get commissioner failed: ' + err);
                    }

                    cachedCommissioners = commissioners.length;

                    if(!cachedAgents){
                        User
                            .find({roles: ['Agent']})
                            .exec(function (err, agents) {
                                if(err){
                                    console.log('Get commissioner failed: ' + err);
                                }

                                cachedAgents = agents.length;

                                if(!cachedMissions){
                                    Mission
                                        .find({})
                                        .exec(function (err, missions) {
                                            if(err){
                                                console.log('Get commissioner failed: ' + err);
                                            }

                                            cachedMissions = missions.length;

                                            res.status(200)
                                                .send({
                                                    missions: cachedMissions,
                                                    agents: cachedAgents,
                                                    commissioners: cachedCommissioners
                                                });
                                            res.end();
                                        })

                                }
                            })

                    }
                })

        }
        else{
            res.status(200)
                .send({
                    missions: cachedMissions,
                    agents: cachedAgents,
                    commissioners: cachedCommissioners
                });
            res.end();
        }
    }
};