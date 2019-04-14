var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatHistory = {};

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

    // If room doesn't have chat history, create room in dictionary
    if (!(currentRoom in chatHistory)) {
      if (currentRoom != '') {
        chatHistory[currentRoom] = []
        console.log("added room to history" + currentRoom)
        console.log(chatHistory)
      }
    }

    // Return the chat history for current room
    console.log("=======================")
    console.log("retrieving from: " + currentRoom)
    console.log(chatHistory[currentRoom])
    if (chatHistory[currentRoom] !== undefined) {
      if (chatHistory[currentRoom].length !== 0) {

        for (var i = 0; i < chatHistory[currentRoom].length; i++) {
          io.to(socket.id).emit('chat message', chatHistory[currentRoom][i])
          //Do something
        }
      }
    }
    console.log("=======================")
  });

  socket.on('chat message', function(msg) {
    // get current room of socket to emit message in
    var currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
    io.in(currentRoom).emit('chat message', msg)

    // Append message to history for this room
    chatHistory[currentRoom].push(msg);
    console.log(chatHistory)
  });
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
