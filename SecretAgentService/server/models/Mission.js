var mongoose = require('mongoose');

var missionSchema = mongoose.Schema({
    award: {type: Number, require: '{PATH} is required'},
    location: {type: String, require: '{PATH} is required'},
    missionTarget: {type: String, require: '{PATH} is required'},
    postedBy: {type: String, require: '{PATH} is required'},
    difficult: {type: String, require: '{PATH} is required'},
    agent: {type: String}
});

var Mission = mongoose.model('Mission', missionSchema);

module.exports.seedInitialMission = function() {
    Mission.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find missions: ' + err);
            return;
        }

        if (collection.length === 0) {

            Mission.create({
                award: 1000,
                location: 'Sofia',
                missionTarget: 'Delqn Peevski',
                postedBy: 'Pesho',
                difficult: 'Very Hard',
                agent: 'Stamat'
            });
            Mission.create({
                award: 2000,
                location: 'Plovdiv',
                missionTarget: 'Volen Siderov',
                postedBy: 'Stamat',
                difficult: 'Very Hard',
                agent: 'Ivan'
            });
            Mission.create({
                award: 1500,
                location: 'Varna',
                missionTarget: 'Dogankata',
                postedBy: 'Gosho',
                difficult: 'Very Hard',
                agent: 'Goshkata'
            });

            console.log('Missions added to database...');
        }
    });
};