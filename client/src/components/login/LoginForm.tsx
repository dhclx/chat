import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import UserContext from '../auth/UserContext';
import { useEffect } from 'react';

const useStyles = makeStyles({
  container: {
    width: 300,
    height: 300,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  disabledButton: {
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black'
  },
  button: {
    backgroundColor: 'black',
    border: '1px solid black',
    color: 'white'
  }
});

const LoginForm: React.FunctionComponent = () => {
  const classes = useStyles();
  const { login, socket, user } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (user.auth) {
      socket?.emit('login', user.username, 'chatRoom1')
    }
  }, [socket, user])

  const handleLogin = async () => {
    login(username);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <p>hello!</p>
      <p>enter a username <b>of at least 3 chars</b> to join the chatroom!</p>
      <TextField
        id="form-username"
        label="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && (username.length > 2) && (username !== 'admin')) {
            e.preventDefault();
            handleLogin();
          }
        }}
        required
      />
      <Button
        className={!(username.length > 2 && (username !== 'admin')) ? classes.disabledButton : classes.button}
        disabled={!(username.length > 2 && (username !== 'admin'))}
        onClick={() => handleLogin()}
      >
        enter
      </Button>
    </form>
  );
};

export default LoginForm;
