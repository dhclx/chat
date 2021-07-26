import React from 'react';

import Chat from './pages/Chat';
import LoginDrawer from './components/login/LoginDrawer';
import UserProvider from './components/auth/UserProvider';

const App: React.FunctionComponent = () => {
  // TBD: Users should be a richer feature. For now, this will just represent
  // choosing a username in the frontend before entering chat room.

  return (
    <UserProvider>
      <LoginDrawer />
      <Chat />
    </UserProvider>
  );
};

export default App;
