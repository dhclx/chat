import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../auth/UserContext';
import { useEffect } from 'react';

const useStyles = makeStyles({
  chatStream: {
    height: '100%',
    overflow: 'scroll'
  }
});

interface MessageEntry {
  user: {
    username: string
  },
  message: string
};
type Messages = MessageEntry[];

const ChatStream = () => {
  const classes = useStyles();
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    socket?.on('newMessage', (data) => {
      setMessages(messages => [...messages, data]);
    })
  }, [socket])

  const renderMessages = () => (
    messages.map((message: MessageEntry) => (
      <p><b>{message.user.username}</b>&nbsp;&nbsp;{message.message}</p>
    ))
  );

  return (
    <div className={classes.chatStream}>
      {renderMessages()}
    </div>
  );
};

export default ChatStream;
