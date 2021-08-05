import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../auth/UserContext';
import { useEffect } from 'react';

const useStyles = makeStyles({
  container: {
    overflow: 'scroll',
    padding: '0 15px',
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    margin: '10px 0'
  }
});

interface User {
  socketId: string,
  username: string
};

const UserList = () => {
  const classes = useStyles();
  const { socket } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket?.on('addUser', (user) => {
      setUsers((users) => [...users, user]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('allUsers', (allUsers) => {
      setUsers((users) => [...allUsers]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('removeUser', (user) => {
      setUsers((users) => users.filter(entry => entry.socketId !== user.socketId));
    });
  }, [socket]);

  const renderUsers = () => (
    users.map(user => (
      <p className={classes.name}><b>{user.username}</b></p>
    ))
  );

  return (
    <div className={classes.container} >
      <p><i>current users:</i></p>
      {renderUsers()}
    </div>
  );
};

export default UserList;
