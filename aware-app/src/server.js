var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var isValidLogin = require('./landing/db/verifier').isValidLogin;

// Grab port from Nodemon command & if not specified set to 5001
var port = process.argv[2];
if (port == undefined) port = 5001;

var chatHistory = {};

// create a GET route
app.get('/server', (req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', function(socket) {
  console.log('Client Has Connected, id: ' + socket.id)

  socket.on('login', (username, password) => {
    isValidLogin(username, password).then((result) => {
      if (result) {
        io.to(socket.id).emit("login-request", true);
      } else {
        io.to(socket.id).emit("login-request", false);
      }
    })
  });

  socket.on('room', function(room) {
    var currentRoom = getRoom();

    // Check if attempting to join current room
    if (currentRoom != room) {
      socket.leave(currentRoom, function() {
        socket.join(room, loadHistory(room));
      })
    } else {
      loadHistory(room);
    }
  });

  socket.on('chat message', function(msg) {
    // get current room of socket to emit message in
    var currentRoom = getRoom();
    if (currentRoom != null) {
      io.in(currentRoom).emit('chat message', msg)
      // Append message to history for this room
      chatHistory[currentRoom].push(msg);
    }
  });

  function loadHistory(room) { 
    // If room doesn't have chat history, create room in dictionary
    if (!(room in chatHistory)) {
      if (room != '') {
        chatHistory[room] = []
        console.log("added room to history" + room)
      }
    } else {
      for (var i = 0; i < chatHistory[room].length; i++) {
        io.to(socket.id).emit('chat message', chatHistory[room][i])
      }
    }
  }

  function getRoom() {
    return Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id)[0];
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});