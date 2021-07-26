import { createContext } from 'react';
import { Socket } from 'socket.io-client';

interface UserContextInterface {
  user: {
    username: string
    auth: boolean
  },
  login: (username: string) => void,
  logout: () => void,
  socket: Socket | null
};

const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

export default UserContext;
