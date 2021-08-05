import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../auth/UserContext';
import { useEffect } from 'react';

const useStyles = makeStyles({
  chatStream: {
    height: 'auto',
    overflow: 'scroll',
    padding: '0 15px',
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  message: {
    margin: '10px 0',
    color: 'white'
  }
});

interface MessageEntry {
  username: string,
  message: string,
  _id: any
};
type Messages = JSX.Element[];

const ChatStream = () => {
  const classes = useStyles();
  const { socket, user } = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    const formatData = (data: MessageEntry) => {
      const { username, message, _id } = data;
      const isAdmin = username === 'admin';
      const isCurrentUser = username === user.username;
      const nameStyles = {
        fontWeight: 400,
        fontStyle: 'italic',
        color: 'white'
      };

      if (isCurrentUser) {
        nameStyles.fontWeight = 700;
        nameStyles.fontStyle = 'normal';
      };

      if (isAdmin) {
        nameStyles.fontWeight = 700;
      };

      return (
        <p key={_id} className={classes.message}>
          {!isAdmin &&
            <span style={nameStyles}>
              {username}:&nbsp;
            </span>
          }
          <span style={isAdmin ? nameStyles : {}}>
            {message}
          </span>
        </p>
      )
    };

    socket?.on('newMessage', (data) => {
      const formattedMessage = formatData(data);
      setMessages((messages) => [formattedMessage, ...messages]);
    });
  }, [classes.message, socket, user.username]);

  return (
    <div className={classes.chatStream}>
      {messages}
    </div>
  );
};

export default ChatStream;
