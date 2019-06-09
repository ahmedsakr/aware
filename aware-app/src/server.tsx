import * as express from 'express';
import {Server} from 'http';
import * as SocketIO from 'socket.io'
import * as verifier from './landing/db/verifier';
import * as registration from './landing/db/register';
import * as message from './messaging-service/db/message'
import * as rooms from './messaging-service/db/rooms';

let app = express();
let http: Server = new Server(app);
let io: SocketIO.Server = SocketIO(http);

// Grab port from Nodemon command & if not specified set to 5001
let port: string = process.argv[2];
if (port == undefined) port = "5001";

// create a GET route
app.get('/server', (_req, res) => {
  res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', (socket : SocketIO.Socket) => {
  console.log('Client Has Connected, id: ' + socket.id)

  // Listen for login requests from users
  socket.on('login', (username: string, password: string) => {
    verifier.verifyLogin(username, password)
    .then((result: boolean) => {
      io.to(socket.id).emit("login-request", result);
    })
    .catch(() => {

      // The query to login failed for some reason; return false to the user.
      io.to(socket.id).emit("login-request", false);
    });
  });

  socket.on('register', (username: string, password: string) => {
    registration.registerUser(username, password)
    .then((result: boolean) => {
      io.to(socket.id).emit("register-request", result);
    })
    .catch(() => {
      io.to(socket.id).emit("register-request", false);
    });
  });

  socket.on('get-rooms', (username: string) => {
    rooms.getRooms(username).then((userRooms: string[]) => {
      io.to(socket.id).emit("user-rooms", userRooms);
    });
  });

  socket.on('room', (room: string) => {
    let currentRoom: string = getRoom();

    // Check if attempting to join current room
    if (currentRoom !== room) {
      socket.leave(currentRoom, () => {
        socket.join(room, () => {
          loadHistory(socket.id, room)
        });
      })
    } else {
      loadHistory(socket.id, room);
    }
  });

  socket.on('chat message', function(msg, groupId, username) {
    // get current room of socket to emit message in
    var currentRoom = getRoom();
    if (currentRoom != null) {
      message.insertMessage(msg, groupId, username)
      .then(() => {
        io.in(currentRoom).emit('chat message', msg)
      })
    }
  });

  
  function getRoom(): string {
    return Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id)[0];
  }
});

function loadHistory(socketId: string, room: string): void { 
  // Temporary hack again to get the proper formatted room
  room = room.replace(/\s/g, '').toLowerCase();

  // If room doesn't have chat history, create room in dictionary
  message.getMessages(room)
  .then((result: string[]) => {
    io.to(socketId).emit('chat history', result);
  })
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});