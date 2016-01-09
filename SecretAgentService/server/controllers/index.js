var usersController = require('../controllers/usersController');
var messageController = require('../controllers/MessageController');
var missionController = require('../controllers/MissionController');
var listUsersController = require('../controllers/ListUsersController');

module.exports = {
    users: usersController,
    messages: messageController,
    mission: missionController,
    listUsers: listUsersController
};