import 'babel-polyfill'
import express, {Express} from 'express';
import httpServer from 'http';
import SocketIO from 'socket.io';

import verifyLogin from './landing/db/verifier';
import registerUser from './landing/db/register';
import Messages from './messaging-service/db/message'
import getRooms from './messaging-service/db/rooms';

let app: Express = express();
let http: httpServer.Server = new httpServer.Server(app);
let io: SocketIO.Server = SocketIO(http);

// Grab port from Nodemon command & if not specified set to 5001
let port: string = process.argv[2];
if (port == undefined) port = "5001";

// create a GET route
app.get('/server', (_req, res) => {
    res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', (socket: SocketIO.Socket) => {
    console.log('Client Has Connected, id: ' + socket.id)

    // Listen for login requests from users
    socket.on('login', (username: string, password: string) => {
        verifyLogin(username, password)
            .then((result: boolean) => {
                io.to(socket.id).emit("login-request", result);
            })
            .catch(() => {

                // The query to login failed for some reason; return false to the user.
                io.to(socket.id).emit("login-request", false);
            });
    });

    socket.on('register', (username: string, password: string) => {
        registerUser(username, password)
            .then((result: boolean) => {
                io.to(socket.id).emit("register-request", result);
            })
            .catch(() => {
                io.to(socket.id).emit("register-request", false);
            });
    });

    socket.on('get-rooms', (username: string) => {
        getRooms(username).then((userRooms: Object[]) => {
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

    socket.on('chat message', (msg, groupId, username) => {
        // get current room of socket to emit message in
        var currentRoom = getRoom();

        if (currentRoom != null) {
            new Messages(groupId).insertMessage(msg, username)
                .then(() => {
                    io.in(currentRoom).emit('chat message', msg)
                })
        }
    });


    const getRoom: () => string = () => {
        return Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item != socket.id)[0];
    }
});

function loadHistory(socketId: string, room: string): void {
    // Temporary hack again to get the proper formatted room
    room = room.replace(/\s/g, '').toLowerCase();

    // If room doesn't have chat history, create room in dictionary
    new Messages(room).getMessages()
        .then((result: Object[]) => {
            io.to(socketId).emit('chat history', result);
        })
}

http.listen(port, () => {
    console.log('listening on *:' + port);
});