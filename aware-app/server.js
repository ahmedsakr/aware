var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create a GET route
app.get('/server', (req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', function(socket){
  console.log('Client Has Connected.')
  socket.on('chat message', function(msg){
    console.log(msg);
  });
  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  });
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
