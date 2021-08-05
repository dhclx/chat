import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../auth/UserContext';
import { useEffect } from 'react';

const useStyles = makeStyles({
  chatStream: {
    height: 'auto',
    // overflow: 'scroll'
  }
});

interface MessageEntry {
  username: string,
  message: string,
  _id: any
};
type Messages = MessageEntry[];

const ChatStream = () => {
  const classes = useStyles();
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    socket?.on('newMessage', (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  const renderMessages = () => (
    messages?.map((entry: MessageEntry) => (
      <p key={entry._id}><b>{entry.username}</b>&nbsp;&nbsp;{entry.message}</p>
    ))
  );

  return (
    <div className={classes.chatStream}>
      {renderMessages()}
    </div>
  );
};

export default ChatStream;
