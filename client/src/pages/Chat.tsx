import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import InputBox from '../components/chat/InputBox';
import ChatStream from '../components/chat/ChatStream';
import UserContext from '../components/auth/UserContext';

const useStyles = makeStyles({
  chatContainer: {
    border: '1px solid black',
    height: 700,
    width: 500
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
      <div className={classes.chatContainer}>
        <ChatStream />
        <InputBox />
      </div>
    );
  }

  // return loading spinner here:
  return null;
}

export default Chat;
