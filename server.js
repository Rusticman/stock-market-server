const express = require('express');
const socketio =  require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

// Express part
const app = express();
const server = app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Server started:', process.env.PORT);
});

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: "*/*" }));

router(app);


// io part
const io = socketio(server);
io.on('connection', function (socket) {
  console.log('New client connected!', socket.id);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('new_company', function (company) {
    console.log('company: ' + company);
    io.emit('company_received', company);
  });

  socket.on('delete', function(symbol){
    console.log('delete this company: ' + symbol);
    io.emit('deleted_company_received', symbol);
  })

});
