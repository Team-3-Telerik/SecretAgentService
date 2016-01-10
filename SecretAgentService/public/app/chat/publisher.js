var publisher = function () {
    var messagesBox = $('#messagesBox');

    var displayMessage = function (messageObj) {

        var root = $('#messagesBox');

        var date = new Date();

        var minutes = date.getMinutes().toString();
        minutes = minutes.length == 1 ? '0' + minutes : minutes;

        var hours = date.getHours().toString();
        hours = hours.length == 1 ? '0' + hours : hours;

        var time = hours + ':' + minutes;
        var entireMessage =
            '<div id="holemsg"><span id="username" style="font-family: Montserrat,sans-serif;font-size: large;color:' + messageObj.userNameColor +
            ';">' + messageObj.username + ': </span>' + '<span id="textmessage">' +
            messageObj.message + '</span><span style="float: right;font-size: 0.8em;">' + time + '</span>' + '</div><span class="divider"></span>';

        root.append(entireMessage);

        var element = document.getElementById("messagesBox");
        element.scrollTop = element.scrollHeight;
    };

    return {
        displayMessage: displayMessage
    }
}();