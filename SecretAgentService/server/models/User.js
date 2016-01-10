var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true, minlength: 6, maxlength: 50 },
    email: { type: String, require: '{PATH} is required' },
    pictureUrl: { type: String, require: '{PATH} is required', default: 'http://i.kinja-img.com/gawker-media/image/upload/s---_2tMDfu--/18dcr6273baymjpg.jpg' },
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
            hashedPwd = encryption.generateHashedPassword(salt, 'chavdar');
            User.create({username: 'Chavdar.Angelov', email: 'chavdar.angelov@gmail.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'nikolay');
            User.create({username: 'Nikolay.Mishev', email: 'nikolay.mishev@gmail.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'adrian');
            User.create({username: 'Adrian.Apostolov', email: 'adrian.apostolov@gmail.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            console.log('Users added to database...');
        }
    });
};