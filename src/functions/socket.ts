import { ClientMessage } from '../types/socket';
import { Message } from '../types/db';
import { Socket } from 'socket.io';

export const reply = (wsReq: ClientMessage, dbRes: Message, socket: Socket) => {
  console.log('returned message to client :)');
};
