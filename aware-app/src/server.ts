import 'babel-polyfill'
import express, {Express} from 'express';
import httpServer from 'http';
import SocketIO from 'socket.io';

import * as awaredb from './shared/database/awaredb'
import {UserMessage} from './shared/messaging/messenger'
import verifyLogin from './landing/db/verifier';
import registerUser from './landing/db/register';
import Messages from './messaging-service/db/message'
import getCourses from './messaging-service/db/rooms';
import {getRelatedUsers} from './messaging-service/db/userRelations'
import { AccountField } from './shared/verification/user';
import {startDirectMessage, isExistingDirectMessage} from './messaging-service/db/directMessaging'
import { ChatDomain, ChatData, MessengerChat } from './messaging-service/api/Messaging';

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
    socket.on('login', (username: AccountField, password: AccountField) => {
        verifyLogin(username, password)
            .then((result: boolean) => {
                io.to(socket.id).emit("login-request", result);
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

    socket.on('get-courses', (username: string) => {
        getCourses(username).then((userRooms: ChatData[]) => {
            io.to(socket.id).emit("user-courses", userRooms);
        });
    });

    socket.on('get-related-users', (username: string) => {
        getRelatedUsers(username)
        .then((users: Object[]) => {
            io.to(socket.id).emit('get-related-users', users);
        })
    });

    socket.on('room', (chat: MessengerChat) => {
        new Promise((resolve, reject) => {
            socket.leave(getRoom()).join(chat.data.id, (error: string | null) => {
                if (error === null) {
                    resolve();
                } else {
                    reject();
                }
            });
        })

        .then(() => loadHistory(socket.id, chat))
        .catch((error) => console.error(error));
    });

    socket.on('chat message', async (message: UserMessage, chat: MessengerChat) => {

        if (chat.domain === ChatDomain.DIRECT_MESSAGE && !(await isExistingDirectMessage(chat.data.id))) {
            await startDirectMessage(chat.data.id, message.username, chat.data.receiverId as string);
        }

        new Messages(chat).insertMessage(message)
            .then(() => {
                io.in(getRoom()).emit('chat message', message)
            })
    });

    const getRoom: () => string = () => {
        let rooms: string[] = Object.keys(io.sockets.adapter.sids[socket.id]);

        /*
         * The first entry of the array is always the default user channel that is unused.
         * The second entry should be the current room that the user is in.
         *
         * The user has not joined any room if the length of the array is 1.
         */
        if (rooms.length === 1) {
            return '';
        } else {
            return rooms[1];
        }
    }
});

function loadHistory(socketId: string, chat: MessengerChat): void {

    // If room doesn't have chat history, create room in dictionary
    new Messages(chat).getMessages()
        .then((result: Object[]) => {
            io.to(socketId).emit('chat history', result);
        })
}

http.listen(port, () => {
    console.log('listening on *:' + port);
});

http.on("close", () => {

    // Close the connection to the database on exit.
    awaredb.destroy();
})