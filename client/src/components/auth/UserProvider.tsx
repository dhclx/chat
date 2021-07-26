import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';

import UserContext from './UserContext';

interface Props {
  children: JSX.Element[] | JSX.Element
};

const loggedOutState = {
  username: '',
  auth: false
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState(loggedOutState);
  const [socket, setSocket] = useState<Socket | null>(null);
  const port = process.env.REACT_APP_SOCKET_ENDPOINT ?? '';

  const login = (username: string) => {
    setUser({
      username,
      auth: true
    })
    connect();
  };

  const logout = () => {
    setUser(loggedOutState);
  };

  const connect = () => {
    const connection = io(port);
    setSocket(connection);
  };

  const state = { user, login, logout, socket: (socket ?? null) };

  return (
    <UserContext.Provider value={state} >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;