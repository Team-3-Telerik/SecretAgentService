var socketio_jwt = require('socketio-jwt');
var socket_io = require('socket.io');
var jwt = require('jsonwebtoken');

var clients = {};
var secret = 'Return of the Jedi';

function getToken(payload) {
    // The payload will be sent inside the token, it can be username, id etc.
    var token = jwt.sign(payload, secret, { expiresInMinutes: 60*5 });
    return token;
}

function init(server) {
    var sio = socket_io.listen(server);
    console.log('socket.io open...');

    sio.use(socketio_jwt.authorize({
        secret: secret,
        handshake: true
    }));

    sio.sockets
        .on('connection', function (socket) {
            var username = socket.decoded_token.username;
            console.log(username, 'connected');
            clients[username] = socket;
            socket.on('ping', function (m) {
                socket.emit('pong', m);
            });
        });

    if (!process.env.NODE_ENV) {
        setInterval(function () {
            sio.sockets.emit('time', Date());
        }, 2000);
    }
}

module.exports = {
    init: init,
    clients: clients,
    getToken: getToken
}