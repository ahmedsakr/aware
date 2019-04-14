var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create a GET route
app.get('/server', (req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', function(socket) {
  console.log('Client Has Connected, id: ' + socket.id)

  socket.on('room', function(room) {
    var currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);

    // Check if attempting to join current room
    if (currentRoom != room) {
      socket.leave(currentRoom)
      socket.join(room);
    }
  });

  socket.on('chat message', function(msg) {
    // get current room of socket to emit message in
    var currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
    io.in(currentRoom).emit('chat message', msg)
  });
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
