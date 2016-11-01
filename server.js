import express from 'express';
import socketio from 'socket.io';

// Express part
const app = express();
const server = app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Server started: http://localhost:3000');
});

// io part
const io = socketio(server);
io.on('connection', function (socket) {
  console.log('New client connected!', socket.id);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('new_message', function (msg) {
    console.log('message: ' + msg);
    io.emit('message_received', msg);
  });

  socket.emit('message_received', 'hi');
});
