var socket = io();
var userName = 'Mike';

socket.on('connect', function () {
    console.log('Connected To Server');

    socket.emit('createMessage', {
        from: userName,
        text: 'Hello!'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function (message) {
    if(message.from !== userName) {
        console.log('New Message Received', message);
    }
});