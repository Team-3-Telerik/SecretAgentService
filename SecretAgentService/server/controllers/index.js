var usersController = require('../controllers/UsersController');
var messageController = require('../controllers/MessageController');
var missionController = require('../controllers/MissionController');
var adminController = require('../controllers/AdminController');
var listUsersController = require('../controllers/ListUsersController');
var statistic = require('../controllers/StatisticsController');

module.exports = {
    users: usersController,
    messages: messageController,
    mission: missionController,
    admin: adminController,
    listUsers: listUsersController,
    statistics: statistic
};