// those individual imports are types from @types/express:
import express, { Request, Response, NextFunction } from 'express';
import { Server, Socket } from 'socket.io';
import { createMessage, getRecentMessages } from './controllers/messageController';
import { reply } from './functions/socket';

require("dotenv").config();
const http = require('http');
const cors = require('cors');
const path = require('path');
// probably the least safe piece of code i've written:
const corsOptions = {
  cors: true,
  origins: ["*"],
}

import mongoConnect from './config/mongo';
import Message from './models/message';

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
  })

  // New message:
  socket.on('message', (data) => {
    console.log('**received new message from frontend');
    console.log(data)
    createMessage(data)
      .then(res => {
        console.log('createMessage success: ', res);
        io.to('chatRoom1').emit('newMessage', res)
        reply(data, res, socket);
      })
      .catch(e => console.log('createMessage error: ', e));
  });

  // Disconnect
  socket.on('disconnect', () => {
    // we need to add the user to db here maybe? need to accept some user info from frontend here
    console.log('user on socketId: ' + socket.id + ' has disconnected! :(');
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
