var auth = require('./auth'),
    path = require('path'),
    controllers = require('../controllers');

module.exports = function(app) {

    app.get('/favicon.ico', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../favicon.ico'))
    });


    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/missions', controllers.mission.getAllMission);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../views/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.get('/:partial', function (req, res) {
        res.render('../views/account/' + req.params.partial, {currentUser: req.user});
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('/', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};