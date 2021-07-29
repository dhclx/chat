import React, { useContext, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import styles from './InputBox.module.scss';
import UserContext from '../auth/UserContext';

const useStyles = makeStyles({
  messageInput: {
    width: '100%'
  }
});


const InputBox = () => {
  const classes = useStyles();
  const { user, socket } = useContext(UserContext);
  const [message, setMessage] = useState<string>('');

  const UserAdornment = () => (
    <InputAdornment position="start" >
      {user.username}
    </InputAdornment>
  );

  const sendMessage = () => {
    socket?.send({
      user,
      message
    });
    setMessage('');
  };

  return (
    <div className={styles.container}>
      <UserAdornment />
      <InputBase
        className={styles.input}
        placeholder="Write here..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          };
        }}
      />
      <IconButton className={styles.iconButton} onClick={() => sendMessage()}>
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};

export default InputBox;
