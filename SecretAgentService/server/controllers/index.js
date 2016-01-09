var usersController = require('../controllers/usersController');
var messageController = require('../controllers/MessageController');
var missionController = require('../controllers/MissionController');
var adminController = require('../controllers/AdminController');
var listUsersController = require('../controllers/ListUsersController');

module.exports = {
    users: usersController,
    messages: messageController,
    mission: missionController,
    admin: adminController,
    listUsers: listUsersController
};