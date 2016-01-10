var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');
var clients = require('../config/socket').clients;

module.exports = {
    getInbox : function (req, res, next) {
        var currentUser = req.user;
        Message.find({ 'to': currentUser._id })
            .exec(function (err, messages) {
                if (err) {
                    res.send(err);
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(messages);
                console.log('Get messages' + messages);
                // Mark as read after sent
                messages.forEach(function (m) {
                    m.read = true;
                    m.save();
                });
            });
    },
    getSent : function (req, res, next) {
        var currentUser = req.user;
        Message.find({ 'from': currentUser._id })
            .exec(function (err, messages) {
                if (err) {
                    res.send(err);
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(messages);
            });
    },
    getMessageById: function (req, res, next) {
        var currentUser = req.user;
        Message.findOne(
            {
                $and:
                    [
                        {_id: req.params.id},
                        { $or:[ {'from': currentUser._id}, {'to': currentUser._id} ] }
                    ]
            })
            .exec(function (err, message) {
                if (err) {
                    res.send(err);
                    return console.log('Message could not be loaded: ' + err);
                }

                if (message) {
                    res.send(message);
                    // Mark as read
                    if (!message.read && message.to.username == currentUser.username) {
                        message.read = true;
                        message.save();
                    }
                } else {
                    res.status(404).send('Message not found!');
                }
            });
    },
    sendMessage: function (req, res) {
        if (req.isAuthenticated() || req.user.roles.indexOf('admin') > -1) {

            console.log(req.body);
            if (req.body.from === req.body.to) {
                return res.status(404).send({message: 'You cannot send message to your self!'});
            }

            var data = req.body;

            var newMessage = new Message({
                title: data.title,
                content: data.content,
                date: new Date(),
                from: data.from,
                to: data.to,
                read: false
            });

            newMessage.save(function (err) {
                if (err) {
                    res.status(400).send(err);
                    return console.log('Error in saving message' + err);
                }

                res.send(newMessage);
                if(clients[receiver.username])
                {
                    clients[receiver.username].emit('newMessage', { from: sender.username });
                }
            });
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
        /*
        var sender = req.user;
        User.findOne({ username: req.params.username }).exec(function (err, receiver) {
            if (receiver) {

                if (receiver._id.equals(sender._id)) {
                    return res.status(404).send({message: 'You cannot send message to your self!'});
                }

                var newMessage = new Message({
                    title: req.body.title,
                    content: req.body.content,
                    date: new Date(),
                    from: sender._id,
                    to: receiver._id,
                    read: false
                });

                newMessage.save(function (err) {
                    if (err) {
                        res.status(400).send(err);
                        return console.log('Error in saving message' + err);
                    }

                    res.send(newMessage);
                    if(clients[receiver.username])
                    {
                        clients[receiver.username].emit('newMessage', { from: sender.username });
                    }
                });

                receiver.messages.push(newMessage);
                receiver.save();
            } else {
                res.status(404).send('User not found!');
            }
        });
        */
    }
};