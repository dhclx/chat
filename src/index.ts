// those individual imports are types from @types/express:
import express, { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
import { createMessage } from './controllers/messageController';
import { createUser, removeUser, getAllUsers } from './controllers/userController';
import { reply } from './functions/socket';
import { corsOptions } from './config/options';

require("dotenv").config();
const http = require('http');
const cors = require('cors');
const path = require('path');

import mongoConnect from './config/mongo';

const port = process.env.PORT || process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build/')));
app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname + '/../client/build/index.html')));
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, corsOptions);

// Connect:
io.on("connection", (socket: Socket) => {
  console.log('user on socketId: ' + socket.id + ' has connected! :)');

  // User login
  socket.on('login', (name, room) => {
    socket.join(room)
    console.log(name, 'has logged in to', room)

    // Add user record:
    createUser({ username: name, socketId: socket.id })
      .then((res) => {
        console.log(`added ${name} to users collection`)

        // Instruct connected clients to add user to list:
        io.to(room).emit('addUser', res);

        // Catch up new connection with all current users:
        getAllUsers()
          .then(res => {
            io.to(socket.id).emit('allUsers', res);
          })
          .catch(e => console.log('getAllUsers error: ', e));

        // Send server message to all clients:
        const adminMessage = {
          user: {
            username: 'admin',
            auth: true
          },
          message: `${name} has joined the chat!`
        };
        createMessage(adminMessage)
          .then(res => {
            io.to(room).emit('newMessage', res);
          })
          .catch(e => console.log('createMessage error: ', e));
      })
      .catch(e => console.log('createUser error: ', e));
  });

  // New message:
  socket.on('message', (data) => {
    console.log('**received new message from frontend');
    createMessage(data)
      .then(res => {
        io.to('chatRoom1').emit('newMessage', res)
        reply(data, res, socket);
      })
      .catch(e => console.log('createMessage error: ', e));
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('user on socketId: ' + socket.id + ' has disconnected! :(');

    // Remove d/c'd user record:
    removeUser({ username: null, socketId: socket.id })
      .then((res) => {
        const { username } = res;
        console.log(`removed ${username} (socket ${socket.id}) from users collection`)

        // instruct clients to remove user from list:
        io.to('chatRoom1').emit('removeUser', res);

        // Inform all clients that user left:
        const adminMessage = {
          user: {
            username: 'admin',
            auth: true
          },
          message: `${username} has left the chat :(`
        };
        createMessage(adminMessage)
          .then(res => {
            io.to('chatRoom1').emit('newMessage', res);
          })
          .catch(e => console.log('createMessage error: ', e));
      })
      .catch(e => console.log('removeUser error: ', e));
  });
});


const start = async () => {
  try {
    await mongoConnect();
    console.log('db connected!!!');
    httpServer.listen(port, () => console.log(`server is listening on port ${port}!!!`));
  } catch (e) {
    console.log('error in server startup: ', e);
    throw e;
  };
};

start();
