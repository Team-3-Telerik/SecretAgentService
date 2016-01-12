var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User'),
    Mission = require('mongoose').model('Mission'),
    DEFAULT_PAGE_SIZE = 10,
    DEFAULT_PAGE = 1;

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        if (!Object.keys(newUserData).length) {
            console.log('Here');
            return res.status(400)
                .send({message: 'The request is not valid!'});
        }
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }

                res.send(user);
            })
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getAllUsers: function (req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getUserDetails: function (req, res) {
        User
            .find({_id: req.params.id})
            .exec(function (err, user) {
                if (err) {
                    console.log('Get all users failed: ' + err);
                    return;
                }

                Mission
                    .find({_id: {$in: user[0].missions}})
                    .skip(((req.query.page || DEFAULT_PAGE)-1) * DEFAULT_PAGE_SIZE)
                    .limit(DEFAULT_PAGE_SIZE)
                    .exec(function (err, missions) {
                        if (err) {
                            console.log('Get all users failed: ' + err);
                            return;
                        }
                        
                        res.render('../views/users/userDetails', {
                            user: user[0],
                            userMissions: missions,
                            currentUser: req.user
                        });
                    });
            });

    },
    deleteUser: function (req, res) {
        if (req.user.roles.indexOf('admin') > -1) {
            User.remove({_id: req.params.id}, function (err, user) {
                if (err) {
                    console.log('Delete user by id failed: ' + err);
                    return;
                }

                res.status(202)
                    .send(user);
                res.end();
            });
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    }
};