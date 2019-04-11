var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create a GET route
app.get('/server', (req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', function(socket) {
  console.log('Client Has Connected.')

  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
    console.log('client has joined ' + room)
    socket.join(room);
  });

  socket.on('chat message', function(msg){
    console.log(msg)
    io.to('abc123').emit('chat message', msg);
  });
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
