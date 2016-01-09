var Mission = require('mongoose').model('Mission'),
    User = require('mongoose').model('User');

module.exports = {
    getAdminPanel: function (req, res) {
        res.render('../views/admin/admin', {currentUser: req.user})
    }
};