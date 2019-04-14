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
    var currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
    console.log("current room: " + currentRoom + ", joining: " + room)

    if (currentRoom == room) {
      console.log('already in this room')
    } else {
      socket.leave(currentRoom)
      socket.join(room);
      console.log('client has left ' + currentRoom + ", joined " + room)
    }
  });

  socket.on('chat message', function(msg){
    // Above method for some reason doesn't actually create a room
    var currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
    console.log("Room Set to: " + currentRoom)
    io.in(currentRoom).emit('chat message', msg)
  });
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
