var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create a GET route
app.get('/server', (req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', function(socket) {
  console.log('Client Has Connected.')

  socket.on('room', function(room) {
    socket.join('/SYSC2100');
    console.log('client has joined ' + room)
  });

  socket.on('chat message', function(room, msg){
    // Above method for some reason doesn't actually create a room
    socket.join('/SYSC2100');
    io.in('/SYSC2100').emit('chat message', msg)
  });
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
