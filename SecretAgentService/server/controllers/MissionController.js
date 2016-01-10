var Mission = require('mongoose').model('Mission'),
    User = require('mongoose').model('User'),
    clientPages;


module.exports = {
    getMissionsAdd: function (req, res) {
        res.render('../views/missions/add-missions', {currentUser: req.user})
    },
    createMission: function (req, res) {
        if (req.isAuthenticated() || req.user.roles.indexOf('admin') > -1) {
            var newMission = req.body;
            Mission.create(newMission, function (err, mission) {
                if (err) {
                    console.log('Create mission failed: ' + err);
                }

                res.status(201)
                    .send(mission);
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getAllMissions: function (req, res) {
        var query = {},
            sort = {},
            NUMBER_OF_ITEMS = 10,
            page = req.query.page || 1;

        if (req.query.location) {
            query = {location: req.query.location}
        }

        if (req.query.orderBy == 'award') {
            sort = {award: -1};
        }

        if (req.query.orderBy == 'difficult') {
            sort = {difficult: -1};
        }

        Mission
            .find(query)
            .sort(sort)
            .skip(NUMBER_OF_ITEMS * (page - 1))
            .limit(10)
            .exec(function (err, missions) {
                if (err) {
                    console.log('Get all mission failed: ' + err);
                    return;
                }

                if (!clientPages) {
                    Mission.find({}).exec(function (err, allMissions) {
                        clientPages = Math.ceil(allMissions.length / 10);
                        res.render('../views/missions/missions', {missions: missions, currentUser: req.user, clientPages: clientPages});
                        console.log('here');
                    })
                }
                else {
                    res.render('../views/missions/missions', {missions: missions, currentUser: req.user, clientPages: clientPages});
                }
            });
    },
    getMissionDetails: function (req, res) {
        if (req.isAuthenticated() || req.user.roles.indexOf('admin') > -1) {
            Mission.find({_id: req.params.id}).exec(function (err, mission) {
                if (err) {
                    console.log('Get all mission failed: ' + err);
                    return;
                }

                res.render('../views/missions/mission-details', {mission: mission[0], currentUser: req.user});
            });
        }
    },
    acceptMission: function (req, res) {
        if (req.isAuthenticated() || req.user.roles.indexOf('Agent') > -1) {
            Mission.find({_id: req.params.id}).exec(function (err, mission) {
                if (err) {
                    console.log('Get all mission failed: ' + err);
                    return;
                }

                User.find({_id: req.user.id}).exec(function (err, user) {
                    if (err) {
                        console.log('Get current user failed: ' + err);
                        return;
                    }

                    var currentMission = mission[0];
                    var currentUser = user[0];

                    currentMission.agent = currentUser.username;
                    currentUser.missions.push(currentMission.id);

                    Mission.update({_id: currentMission._id}, currentMission, function (err) {
                        if (err) {
                            console.log('Update mission failed: ' + err);
                        }
                    });
                    User.update({_id: currentUser._id}, currentUser, function (err) {
                        if (err) {
                            console.log('Update user failed: ' + err);
                        }
                    });

                    res.status(200);
                    res.send(currentMission);
                    res.end();
                })
            });
        }
    },
    deleteMission: function (req, res) {
        if (req.user.roles.indexOf('admin') > -1) {
            Mission.remove({_id: req.params.id}, function (err, mission) {
                if (err) {
                    console.log('Delete mission by id failed: ' + err);
                    return;
                }

                res.status(202)
                    .send(mission);
                res.end();
            });
        }
    }
};