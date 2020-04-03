import React from 'react';
import './App.css';

import UserProvider from "./Components/Providers/UserProvider";
import Application from "./Application";
import {Router} from "@reach/router";
import TournamentCreator from "./Components/UI Components/TournamentCreator";
import firebase from "./Components/firestore";




function App() {

  return (
      <UserProvider>
          <Application />
      </UserProvider>

  );
}

export default App;

