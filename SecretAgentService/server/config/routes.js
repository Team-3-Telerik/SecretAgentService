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
    app.post('/api/users/delete', auth.isInRole('admin'), controllers.users.deleteUser);
    app.post('/api/users/update', auth.isInRole('admin'), controllers.users.updateUser);
    app.get('/api/statistics', controllers.statistics.getStatistics);

    app.get('/profile/edit', auth.isAuthenticated, function (req, res) {
        res.render('../views/account/edit', {currentUser: req.user});
    });

    app.get('/missions', controllers.mission.getAllMissions);
    app.get('/missions/add', auth.isAuthenticated, controllers.mission.getMissionsAdd);
    app.post('/missions/add', auth.isAuthenticated, controllers.mission.createMission);
    app.get('/missions/details/:id', auth.isAuthenticated, controllers.mission.getMissionDetails);
    app.post('/missions/details/:id', auth.isAuthenticated, controllers.mission.acceptMission);

    app.get('/admin', auth.isInRole('admin'),controllers.admin.getAdminPanel);
    app.delete('/missions/:id', auth.isInRole('admin'), controllers.mission.deleteMission);
    app.delete('/users/:id', auth.isInRole('admin'), controllers.users.deleteUser);

    app.get('/users/agents', controllers.listUsers.getAllAgents);
    app.get('/users/commissioners', controllers.listUsers.getAllCommissioners);
    app.get('/users/details/:id', auth.isAuthenticated, controllers.users.getUserDetails);

    //Messages
    app.all('/messages/*', auth.isAuthenticated)
        .get('/messages/inbox', controllers.messages.getInbox)
        .get('/messages/outbox', controllers.messages.getOutbox)
        .get('/messages/send/:username', function (req, res) {
            res.render('../views/messages/send', {currentUser: req.user});
        })
        .post('/messages/send/:username', controllers.messages.sendMessage);


    app.get('/chat',auth.isAuthenticated, function (req, res) {
        res.render('../views/chat/chat',{currentUser: req.user});
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
        res.render('../views/home/home', {currentUser: req.user});
    });
};