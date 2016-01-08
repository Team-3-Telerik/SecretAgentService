var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        mongoLab: 'mongodb://team3:agentservice@ds035995.mongolab.com:35995/secret-agent-service',
        db: 'mongodb://localhost/secretagentservice-db',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://team3:agentservice@ds035995.mongolab.com:35995/secret-agent-service',
        port: process.env.PORT || 3000
    }
};