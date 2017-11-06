const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

// handle incoming connections from clients
io.on('connection', socket => {
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
