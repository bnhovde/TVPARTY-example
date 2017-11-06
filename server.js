const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

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
