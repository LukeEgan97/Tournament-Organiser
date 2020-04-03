import React, {useContext} from "react";
import {Redirect, Router} from "@reach/router";
import {UserContext} from "./Components/Providers/UserProvider";
import LandingScreen from "./Components/UI Components/LandingScreen";
import SignUp from "./Components/UI Components/SignUp";
import SignIn from "./Components/UI Components/SignIn";
import TeamInput from "./Components/UI Components/TeamInput";
import TournamentCreator from "./Components/UI Components/TournamentCreator";




function Application() {
    const user = useContext(UserContext);
    return (
        user ?
            <Router>
                <LandingScreen path="/"/>
                <TournamentCreator path ="create"/>
             </Router>

            :
            <Router>
                <SignUp path="signUp"/>
                <SignIn path="/" />
            </Router>

    );
}
export default Application;