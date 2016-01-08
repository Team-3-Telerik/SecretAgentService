var mongoose = require('mongoose');

var missionSchema = mongoose.Schema({
    award: {type: Number, require: '{PATH} is required'},
    location: {type: String, require: '{PATH} is required'},
    missionTarget: {type: String, require: '{PATH} is required'},
    targetPicture : {type: String, require: '{PATH} is required'},
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
                targetPicture : 'http://img.bg.sof.cmestatic.com/media/images/640x360/Apr2015/2110396926.jpg',
                postedBy: 'Pesho',
                difficult: 7,
                agent: 'Stamat',
                description: 'Some description'
            });
            Mission.create({
                award: 2000,
                location: 'Plovdiv',
                missionTarget: 'Crazy Mad Dictator',
                targetPicture: 'http://cache.reelz.com/assets/content/repFrame/62124/the-dictator-promo-01.jpg',
                postedBy: 'Stamat',
                difficult: 5,
                agent: 'Ivan',
                description: 'Some description'
            });
            Mission.create({
                award: 1500,
                location: 'Varna',
                missionTarget: 'The Wolf',
                targetPicture: 'http://unleashthewolf.com/images/wolf_slideshow01.jpg',
                postedBy: 'Gosho',
                difficult: 4,
                agent: 'Goshkata',
                description: 'Some description'
            });

            console.log('Missions added to database...');
        }
    });
};