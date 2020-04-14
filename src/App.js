import React from 'react';
import './App.css';

import UserProvider from "./Components/Providers/UserProvider";
import Application from "./Application";
import {Router} from "@reach/router";
import TournamentCreator from "./Components/UI Components/TournamentCreator";
import firebase from "./Components/firestore";


//This component is what React is going to push to the index.js file, at the dom root node.
//Wrapped in User Provider so user is available in all components
//Application contains the routing and some logic about what can be accessed depending on if you're logged in or not.

function App() {

  return (
      <UserProvider>
          <Application />
      </UserProvider>

  );
}

export default App;

