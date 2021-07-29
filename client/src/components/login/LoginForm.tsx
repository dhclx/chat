import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserContext from '../auth/UserContext';
import styles from './LoginForm.module.scss';
import CustomButton from '../common/CustomizedButton/index'
const useStyles = makeStyles({
  container: {
    width: 300,
    height: 300,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
});



const LoginForm: React.FunctionComponent = () => {
  const classes = useStyles();
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');

  const handleLogin = () => {
    login(username);
  };

  return (
    <div className={styles.form}>
      <form className={classes.container} noValidate autoComplete="off">
        <p>hello!</p>
        <p>enter a username <b>of at least 3 chars</b> to join the chatroom!</p>
        <TextField
          id="form-username"
          label="username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && (username.length > 2)) {
              e.preventDefault();
              handleLogin();
            }
          }}
          required
        />
        <CustomButton
          type="submit"
          onClick={() => handleLogin()}
          title="ENTER"
          small={false}
          disabled={!(username.length > 2)}
        />
      </form>
    </div>
  );
};

export default LoginForm;
