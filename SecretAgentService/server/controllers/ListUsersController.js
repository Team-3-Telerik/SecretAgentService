var User = require('mongoose').model('User'),
    Mission = require('mongoose').model('Mission'),
    DEFAULT_PAGE_SIZE = 10,
    DEFAULT_PAGE = 1;

module.exports = {
    getAllAgents: function (req, res, next) {


        User.find({roles: ['Agent']})
            .skip((req.query.page || DEFAULT_PAGE) - 1)
            .limit(DEFAULT_PAGE_SIZE)
            .exec(function (err, agents) {
                if (err) {
                    console.log('Get all users failed: ' + err);
                    return;
                }

                res.render('../views/users/agents', {agents: agents, currentUser: req.user});
            })
    },

    getAllCommissioners: function (req, res, next) {
        User
            .find({roles: ['Commissioner']})
            .skip((req.query.page || DEFAULT_PAGE) - 1)
            .limit(DEFAULT_PAGE_SIZE)
            .exec(function (err, commissioners) {
                if (err) {
                    console.log('Get all users failed: ' + err);
                    return;
                }

                res.render('../views/users/commissioners', {commissioners: commissioners, currentUser: req.user});
            })
    }
};

