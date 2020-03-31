import React from 'react';
import './App.css';

import UserProvider from "./Components/Providers/UserProvider";
import Application from "./Application";


function App() {
    const user = null;
  return (
      <UserProvider>
          <Application />
      </UserProvider>

  );
}

export default App;
