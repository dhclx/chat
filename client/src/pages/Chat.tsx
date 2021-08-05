import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import InputBox from '../components/chat/InputBox';
import ChatStream from '../components/chat/ChatStream';
import UserList from '../components/chat/UserList';
import UserContext from '../components/auth/UserContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  chatBox: {
    border: '1px solid black',
    height: 700,
    width: '60%',
    margin: '20px 0px 20px 20px',
    backgroundColor: '#aabfc5'
  },
  userList: {
    border: '1px solid black',
    borderLeft: 'none',
    height: 700,
    width: '40%',
    backgroundColor: '#cdd7da',
    margin: '20px 20px 20px 0px',
  }
});

const Chat: React.FunctionComponent = () => {
  const classes = useStyles();
  const { user, socket } = useContext(UserContext);
  const [connected, setConnected] = useState<Boolean>(false);

  useEffect(() => {
    if (user.auth && socket) {
      setConnected(true);
    }
  }, [socket, user.auth])

  if (connected) {
    return (
      <div className={classes.container}>
        <div className={classes.chatBox}>
          <ChatStream />
          <InputBox />
        </div>
        <div className={classes.userList}>
          <UserList />
        </div>
      </div>
    );
  }

  // return loading spinner here:
  return null;
}

export default Chat;
