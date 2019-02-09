
//asdasdasdasdasdasd
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

io.on('connection', function(socket){
  console.log('Client Has Connected.')
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
