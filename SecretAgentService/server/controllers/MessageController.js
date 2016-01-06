var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');
var clients = require('../config/socket').clients;

module.exports = {
    getInbox : function (req, res, next) {
        // GET /api/messages/inbox
        var currentUser = req.user;
        Message.find({ 'to': currentUser._id })
            .populate('from to', 'username firstName lastName imageUrl')
            .exec(function (err, messages) {
                if (err) {
                    res.send(err);
                    return console.log('Messages could not be loaded: ' + err);
                }

                res.send(messages);
                // Mark as read after sent
                messages.forEach(function (m) {
                    m.read = true;
                    m.save();
                });
            });
    },
    getSent : function (req, res, next) {
        // GET /api/messages/inbox
        var currentUser = req.user;
        Message.find({ 'from': currentUser._id })
            .populate('from to', 'username firstName lastName imageUrl')
            .exec(function (err, messages) {
                if (err) {
                    res.send(err);
                    return console.log('Messages could not be loaded: ' + err);
                }
                // DO NOT MARK AS READ !!!
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
            .populate('from to', 'username firstName lastName imageUrl')
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
    sendMessage: function (req, res, next) {
        //api/messages/send/:username
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
    }
};