var socket = io();

socket.on('connect', function () {
    console.log('Connected To Server');

    socket.emit('createMessage', {
        from: 'Mike',
        text: 'Hello!'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function (message) {
    console.log('New Message Received', message);
});