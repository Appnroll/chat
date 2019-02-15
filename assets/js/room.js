import socket from "./socket"

const ROOM_NAME = 'room:lobby';
const GUEST_NAME = 'guest';
const MESSAGE_NAME = 'shout';

var channel = socket.channel(ROOM_NAME, {});

var ul = document.getElementById("messages")
var name = document.getElementById("name")
var msg = document.getElementById("message")

channel.on(MESSAGE_NAME, function(payload) {
    appendMessage(payload.name, payload.message, payload.style || "")
});

channel.join();

msg.addEventListener('keypress', function(event) {
    if (isEnterPressed(event) && msg.value.length > 0) {
        pushMessage(channel, name.value || GUEST_NAME, msg.value)
    }
})

name.addEventListener('keypress', function(event) {
    if (isEnterPressed(event)) {
       pushMessage(channel, "[SYSTEM]", "User name changed to:" + name.value)
    }
})

function appendMessage(user, message, style) {
    var li = document.createElement("li");
    li.style = style;
    li.innerHTML = "<b>" + user + ":</b> " + message;
    ul.appendChild(li);
}

function pushMessage(channel, name, message) {
    channel.push(MESSAGE_NAME, {
        name: name,
        message: message
    });
    msg.value = '';
}

function isEnterPressed(event) {
    return event.keyCode === 13
}
