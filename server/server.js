require('./config/config.js');
const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/messages');
const {generateLocationMessage} = require('./utils/messages');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// Public folder for site content
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callbackFunc) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
        if(callbackFunc) return callbackFunc('Name and Room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    if(callbackFunc) callbackFunc();
  });

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
    var user = users.removeUser(socket.id);
    if(user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

