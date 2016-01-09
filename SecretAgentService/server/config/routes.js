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

    app.get('/profile/edit', auth.isAuthenticated, function (req, res) {
        res.render('../views/account/edit', {currentUser: req.user});
    });

    app.get('/missions', controllers.mission.getAllMission);
    app.get('/missions/add', auth.isAuthenticated, controllers.mission.getMissionsAdd);
    app.post('/missions/add', auth.isAuthenticated, controllers.mission.createMission);
    app.get('/missions/details/:id', auth.isAuthenticated, controllers.mission.getMissionDetails);
    app.post('/missions/details/:id', auth.isAuthenticated, controllers.mission.acceptMission);

    app.get('/admin', auth.isInRole('admin'),controllers.admin.getAdminPanel);

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
        res.render('../views/home/home', {currentUser: req.user});
    });
};