import React, {useContext} from "react";
import { Router,Redirect} from "@reach/router";
import {UserContext} from "./Components/Providers/UserProvider";
import LandingScreen from "./Components/UI Components/LandingScreen";
import SignUp from "./Components/UI Components/SignUp";
import SignIn from "./Components/UI Components/SignIn";
import TournamentCreator from "./Components/UI Components/TournamentCreator";
import Register from "./Components/UI Components/Register";
import ScheduleCreator from "./Components/Timetable Components/ScheduleCreator";
import ManageTournament from "./Components/UI Components/Manage Tournament";
import ViewSchedule from "./Components/UI Components/ViewSchedule";


function Application() {
    const user = useContext(UserContext);
    return (
        user ?
            <Router>
                <ViewSchedule path="view"/>
                <LandingScreen path="/"/>
                <TournamentCreator path ="create"/>
                <Register path="register"/>

                <ScheduleCreator path="test"/>
                <ManageTournament path="manage"/>
             </Router>
            :
            <Router>

                <SignUp path="signUp"/>
                <SignIn path="/" />
            </Router>
    );
}
export default Application;