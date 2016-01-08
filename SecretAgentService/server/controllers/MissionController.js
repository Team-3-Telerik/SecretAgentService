var Mission = require('mongoose').model('Mission');

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
    getAllMission: function (req, res) {
        Mission.find({}).exec(function (err, missions) {
            if (err) {
                console.log('Get all mission failed: ' + err);
                return;
            }

            res.render('../views/missions/missions', {missions: missions, currentUser: req.user});
        })
    },
    getMissionById: function (req, res) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            Mission.find({_id: req.user._id}, function (err, mission) {
                if (err) {
                    console.log('Get mission by id failed: ' + err);
                    return;
                }

                res.render();
            })
        }
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
    }
};