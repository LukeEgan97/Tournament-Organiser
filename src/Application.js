import React, {useContext} from "react";
import { Router } from "@reach/router";
import {UserContext} from "./Components/Providers/UserProvider";
import UserProvider from "./Components/Providers/UserProvider";
import LandingScreen from "./Components/UI Components/LandingScreen";
import SignUp from "./Components/UI Components/SignUp";
import SignIn from "./Components/UI Components/SignIn";


function Application() {
    const user = useContext(UserContext);
    return (
        user ?
            <LandingScreen/>
            :
            <Router>
                <SignUp path="signUp" />
                <SignIn path="/" />
            </Router>

    );
}
export default Application;