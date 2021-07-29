import React, { useContext, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../auth/UserContext';

const useStyles = makeStyles({
  messageInput: {
    width: 500
  }
});

const InputBox = () => {
  const classes = useStyles();
  const { user, socket } = useContext(UserContext);
  const [message, setMessage] = useState<string>('');

  const UserAdornment = () => (
    <InputAdornment position="start">
      {user.username}
    </InputAdornment>
  );

  const sendMessage = () => {
    socket?.emit('message', {
      user,
      message
    });
    setMessage('');
  };

  return (
    <TextField
      id="message-input"
      variant="outlined"
      className={classes.messageInput}
      value={message}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      }}
      InputProps={{
        startAdornment: <UserAdornment />
      }}
    />
  );
};

export default InputBox;
