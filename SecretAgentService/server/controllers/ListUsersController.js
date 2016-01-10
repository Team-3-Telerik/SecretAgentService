var User = require('mongoose').model('User'),
    Mission = require('mongoose').model('Mission'),
    clientPages;


module.exports = {
    getAllAgents: function (req, res, next) {
        var NUMBER_OF_ITEMS = 10,
            page = req.query.page || 1;

        User.find({roles: ['Agent']})
            .skip(NUMBER_OF_ITEMS * (page - 1))
            .limit(NUMBER_OF_ITEMS)
            .exec(function (err, agents) {
                if (err) {
                    console.log('Get all users failed: ' + err);
                    return;
                }
                    console.log(agents);
                if (!clientPages) {

                    User
                        .find({roles: ['Agent']})
                        .exec(function (err, users) {
                            clientPages = Math.ceil(users.length / 10);

                            res.render('../views/users/agents', {
                                agents: agents,
                                currentUser: req.user,
                                clientPages: clientPages
                            });
                            console.log('paging users success!');
                        })
                }
                else {
                    res.render('../views/users/agents', {
                        agents: agents,
                        currentUser: req.user,
                        clientPages: clientPages
                    });

                }
            })
    },

    getAllCommissioners: function (req, res, next) {
        var NUMBER_OF_ITEMS = 10,
            page = req.query.page || 1;

        User
            .find({roles: ['Commissioner']})
            .skip(NUMBER_OF_ITEMS * (page - 1))
            .limit(NUMBER_OF_ITEMS)
            .exec(function (err, commissioners) {
                if (err) {
                    console.log('Get all users failed: ' + err);
                    return;
                }
                if (!clientPages) {

                    User
                        .find({roles: ['Commissioner']})
                        .exec(function (err, users) {
                            clientPages = Math.ceil(users.length / 10);

                            res.render('../views/users/commissioners', {
                                commissioners: commissioners,
                                currentUser: req.user,
                                clientPages: clientPages
                            });
                            console.log('paging commissioners success!');
                        })
                }
                else {
                    res.render('../views/users/commissioners', {
                        commissioners: commissioners,
                        currentUser: req.user,
                        clientPages: clientPages
                    });

                }
            })
    }
};

