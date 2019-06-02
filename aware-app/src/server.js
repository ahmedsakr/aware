var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var verifier = require('./landing/db/verifier');
var registration = require('./landing/db/register');
var message = require('./messaging-service/db/message')

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

  // Listen for login requests from users
  socket.on('login', (username, password) => {
    verifier.verifyLogin(username, password)
    .then((result) => {
      if (result) {
        io.to(socket.id).emit("login-request", true);
      } else {
        io.to(socket.id).emit("login-request", false);
      }
    })
  });

  socket.on('register', (username, password) => {
    registration.registerUser(username, password)
    .then((result) => {
      if (result) {
        io.to(socket.id).emit("register-request", true);
      } else {
        io.to(socket.id).emit("register-request", false);
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
      message.insertMessage(msg)
      .then(() => {
        io.in(currentRoom).emit('chat message', msg)
      })
    }
  });

  function loadHistory(room) { 
    // If room doesn't have chat history, create room in dictionary
    message.getMessages(room)
    .then((result) => {
      io.to(socket.id).emit('chat history', result);
    })
  }

  function getRoom() {
    return Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id)[0];
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});