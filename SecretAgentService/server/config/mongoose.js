var mongoose = require('mongoose'),
    user = require('../models/User'),
    message = require('../models/Message'),
    mission = require('../models/Mission');


module.exports = function(config) {
    mongoose.connect(config.mongoLab);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
    message.init();
    mission.seedInitialMission();
};