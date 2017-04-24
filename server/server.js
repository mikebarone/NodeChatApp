require('./config/config.js');
const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Public folder for site content
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.on('disconnect', () => {
        console.log('User was Disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

