const path = require('path');
const express = require('express');

const port = process.env.PORT || 8000;

const app = express();
const server = app.listen(port);
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', (req, res) => res.sendFile(`${__dirname}./index.html`));

// handle incoming connections from clients
io.sockets.on('connection', socket => {
  // Put socket in game room
  socket.on('room', room => {
    console.log('joining room:', room);
    socket.join(room);
  });

  // Generic event from client
  socket.on('socket/WS_EVENT', (code, data) => {
    console.log('socket/WS_EVENT:', code);
    io.sockets.in(code).emit('message', data);
  });
});

console.log('Server listening on ', port);
server.listen(port);
