var mongoose = require('mongoose');

var missionSchema = mongoose.Schema({
    award: {type: Number, require: '{PATH} is required'},
    location: {type: String, require: '{PATH} is required'},
    missionTarget: {type: String, require: '{PATH} is required'},
    postedBy: {type: String, require: '{PATH} is required'},
    difficult: {type: Number, require: '{PATH} is required'},
    agent: {type: String},
    description: {type: String}
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
                missionTarget: 'Big Nasty Politician',
                postedBy: 'Pesho',
                difficult: 7,
                agent: 'Stamat',
                description: 'Some description'
            });
            Mission.create({
                award: 2000,
                location: 'Plovdiv',
                missionTarget: 'Crazy Mad Dictator',
                postedBy: 'Stamat',
                difficult: 5,
                agent: 'Ivan',
                description: 'Some description'
            });
            Mission.create({
                award: 1500,
                location: 'Varna',
                missionTarget: 'The Wolf',
                postedBy: 'Gosho',
                difficult: 4,
                agent: 'Goshkata',
                description: 'Some description'
            });

            console.log('Missions added to database...');
        }
    });
};