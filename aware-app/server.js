var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create a GET route
app.get('/server', (req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', function(socket){
  console.log('Client Has Connected.')
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
