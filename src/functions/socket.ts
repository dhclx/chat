import { ClientMessage } from '../types/socket';
import { Message } from '../types/db';
import { Socket } from 'socket.io';

export const reply = (wsReq: ClientMessage, dbRes: Message, socket: Socket) => {
  socket.in('chatRoom').emit('newMessage', wsReq);
  console.log('returned message to client :)');
};
