import React, { useState, useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import LoginForm from './LoginForm';

import UserContext from '../auth/UserContext';
import { useEffect } from 'react';

const LoginDrawer: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (user.auth) {
      setOpen(false);
    }
  }, [user]);

  return (
    <Drawer anchor="right" open={open}>
      <LoginForm />
    </Drawer>
  );
};

export default LoginDrawer;
