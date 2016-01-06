var usersController = require('../controllers/usersController');
var messageController = require('../controllers/MessageController');
var missionController = require('../controllers/MissionController');

module.exports = {
    users: usersController,
    messages: messageController,
    mission: missionController
};