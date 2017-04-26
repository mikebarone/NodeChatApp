require('./config/config.js');
const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/messages');
const {generateLocationMessage} = require('./utils/messages');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Public folder for site content
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callbackFunc) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    if (callbackFunc) callbackFunc();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

