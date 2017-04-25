require('./config/config.js');
const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/messages');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Public folder for site content
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    // Send Message to specific user connected with socket
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat'));

    // Send message to everybody except user connected with socket
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (newMessage) => {
        console.log('New Message Received', newMessage);

        // Send message to everybody included user connected with socket
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    });

    socket.on('disconnect', () => {
        console.log('User was Disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

