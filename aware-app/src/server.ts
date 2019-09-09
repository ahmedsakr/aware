import 'babel-polyfill'
import express, { Express } from 'express';
import httpServer from 'http';
import SocketIO from 'socket.io';

import * as awaredb from './shared/database/awaredb'
import verifyLogin from './landing/db/verifier';
import registerUser from './landing/db/register';
import Messages from './messaging-service/db/message'
import { getRooms, Room } from './messaging-service/db/rooms';
import { AccountField } from './shared/verification/user';
import { GroupChat, getAllUsersInAllRooms } from './shared/messenger/messengerQueries'
import { ActiveUser, GroupChatMasterList, Status, UserStatus } from './messaging-service/api/Messaging';

let app: Express = express();
let http: httpServer.Server = new httpServer.Server(app);
let io: SocketIO.Server = SocketIO(http);

// Grab port from Nodemon command & if not specified set to 5001
let port: string = process.argv[2];
if (port == undefined) port = "5001";

// Dictionary where key is the room and values are username, Status
let groupChatMasterList: GroupChatMasterList = {};
let activeUsers: ActiveUser[] = [];

// Fetch data when server starts
parseChatData();

// create a GET route
app.get('/server', (_req, res) => {
    res.send({ express: 'The Express Server is Connected to React' });
});

io.on('connection', (socket: SocketIO.Socket) => {
    console.log('Client Has Connected, id: ' + socket.id)

    // Listen for login requests from users
    socket.on('login', (username: AccountField, password: AccountField) => {
        verifyLogin(username, password)
            .then((result: boolean) => {
                io.to(socket.id).emit("login-request", result);
                if (result) {
                    activateUser(username, socket.id);
                    getRooms(username).then((userRooms: Room[]) => {
                        userRooms.forEach(room => {
                            console.log('Emitting to ', room.group_id, ' cuz ', username, ' logged on');
                            console.log(getAllUsers(room.group_id))
                            io.sockets.in(room.group_id).emit('active users', getAllUsers(room.group_id));
                        })
                    });
                }
            })
            .catch(() => {

                // The query to login failed for some reason; return false to the user.
                io.to(socket.id).emit("login-request", false);
            });
    });

    socket.on('register', (username: AccountField, password: AccountField) => {
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

    socket.on('active users', (activeRoom) => {
        if (activeRoom === '') {
            io.to(socket.id).emit('active users', []);
        } else {
            io.to(socket.id).emit('active users', getAllUsers(activeRoom));
        }
    });

    socket.on('disconnect', function () { // broadcast to all users in each of the rooms
        let username = deactivateUser(socket.id);
        getRooms(username).then((userRooms: Room[]) => {
            userRooms.forEach(room => {
                console.log('Emitting to ', room.group_id, ' cuz ', username, ' logged off');
                console.log(getAllUsers(room.group_id));
                io.sockets.in(room.group_id).emit('active users', getAllUsers(room.group_id));
            })
        });
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

/** 
 * Fetch all user chat data from data base and convert into the dictionary defined above,
 * by default a user is offline until they have connected to the server.
 */
async function parseChatData() {
    getAllUsersInAllRooms().then((result: GroupChat[]) => {
        result.forEach((entry: GroupChat) => {
            if (entry.group_id in groupChatMasterList) {
                let userStatus = {} as UserStatus;
                userStatus.username = entry.username;
                userStatus.status = Status.OFFLINE;
                groupChatMasterList[entry.group_id].push(userStatus);
            } else {
                let groupChat: UserStatus[] = [];
                let userStatus = {} as UserStatus;
                let room = entry.group_id;
                userStatus.username = entry.username;
                userStatus.status = Status.OFFLINE;
                groupChat.push({
                    username: entry.username,
                    status: Status.OFFLINE
                });
                groupChatMasterList[room] = groupChat;
            }
        })
    }).catch(() => {
        console.log('error fetching data')
    });
}

function activateUser(username: AccountField, socketId: string) {
    activeUsers.push({
        username: username,
        socketId: socketId
    });
}

function deactivateUser(socketId: String): AccountField {
    let username = '' as AccountField;
    for (var i = 0; i < activeUsers.length; i++) {
        if (activeUsers[i].socketId === socketId) {
            username = activeUsers[i].username;
            activeUsers.splice(i, 1);
        }
    }
    return username;
}

/**
 * getAllUsers compares the master list to the active users and updates whether a user is online or offline
 * @param room 
 */
function getAllUsers(room: string): UserStatus[] {
    groupChatMasterList[room].forEach((userStatus: UserStatus) => {
        if (activeUsers.some(user => user.username === userStatus.username)) {
            userStatus.status = Status.ONLINE
        } else {
            userStatus.status = Status.OFFLINE
        }
    });
    return groupChatMasterList[room];
}


http.listen(port, () => {
    console.log('listening on *:' + port);
});

http.on("close", () => {

    // Close the connection to the database on exit.
    awaredb.destroy();
})