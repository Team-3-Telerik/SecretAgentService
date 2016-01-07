var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true, minlength: 6, maxlength: 50 },
    email: { type: String, require: '{PATH} is required' },
    pictureUrl: { type: String, require: '{PATH} is required', default: 'defauhttp://i.kinja-img.com/gawker-media/image/upload/s---_2tMDfu--/18dcr6273baymjpg.jpglt' },
    salt: String,
    hashPass: String,
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    roles: [String],
    missions: [{ type: Schema.Types.ObjectId, ref: 'Mission' }]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Ivaylo');
            User.create({username: 'ivaylo.kenov', email: 'ivaylo@gmail.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Nikolay');
            User.create({username: 'Nikolay.IT', email: 'nikolay@gmail.com', salt: salt, hashPass: hashedPwd, roles: ['standard']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Doncho');
            User.create({username: 'Doncho', email: 'doncho@gmail.com', salt: salt, hashPass: hashedPwd});
            console.log('Users added to database...');
        }
    });
};