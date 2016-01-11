var chatManager = function () {

    const CHANEL_NAME = 'bestAgentServices_chat',
        USER_NAME = $('#target').attr('dataUser'),
        USER_PICTURE = $('#target').attr('imgUser');

    var pubNub = PUBNUB.init({
        subscribe_key: 'sub-c-a9f92646-8baf-11e5-a2e7-0619f8945a4f',
        publish_key: 'pub-c-5cf82aac-7a6e-48cb-96e8-95e9a286faa7',
        ssl: false
    });

    var initialize = function () {

        this.subscribe();

        pubNub.history({
            channel: CHANEL_NAME,
            count: 100,
            callback: function (messages) {
                messages = messages[0];
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].username == USER_NAME) {
                        messages[i].userNameColor = "#00ff00";
                    }
                    publisher.displayMessage(messages[i]);
                }
            }
        });
        $('#messageToSend').keyup(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {

                var msg = $('#messageToSend');
                if (msg.val().trim() !== '') {
                    chatManager.publish(msg.val(), USER_NAME);
                }
                msg.val('');

            }
        });

        $('#target').submit(function (e) {

            console.log();

            var msg = $('#messageToSend');
            if (msg.val().trim() !== '') {
                chatManager.publish(msg.val(), USER_NAME);
            }
            msg.val('');
        });

    };

    var subscribe = function () {
        pubNub.subscribe({
            channel: CHANEL_NAME,
            message: function (message) {
                if (message.username == USER_NAME) {
                    message.userNameColor = "#00ff00";
                }

                publisher.displayMessage(message);
            },
            error: function (error) {
                toastr.error('Something went wrong!' + error);
            }
        });
    };

    var userNameColor = "#0000ff";

    var publish = function (message, username) {
        message = _.escape(message);
        var messageObj = {
            username: username,
            message: message,
            userNameColor: userNameColor,
            userPic: USER_PICTURE
        };

        pubNub.publish({
            channel: CHANEL_NAME,
            message: messageObj,
            callback: function (m) {

            }
        });
    };


    return {
        publish: publish,
        subscribe: subscribe,
        initialize: initialize
    };
}();