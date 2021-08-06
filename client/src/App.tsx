import React from 'react';

import Chat from './pages/Chat';
import LoginDrawer from './components/login/LoginDrawer';
import UserProvider from './components/auth/UserProvider';

const App: React.FunctionComponent = () => {
  return (
    <UserProvider>
      <LoginDrawer />
      <Chat />
    </UserProvider>
  );
};

export default App;
