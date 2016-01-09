var usersController = require('../controllers/usersController');
var messageController = require('../controllers/MessageController');
var missionController = require('../controllers/MissionController');
var adminController = require('../controllers/AdminController');

module.exports = {
    users: usersController,
    messages: messageController,
    mission: missionController,
    admin: adminController
};