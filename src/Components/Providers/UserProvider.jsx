import React, { Component, createContext } from "react";
import { auth } from "../firestore";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => { //This is always run, so the first thing any component does is check for a user
        auth.onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth});
        });
    };
    render() {
        return ( //can access user any where in our application because the properties are passed down
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;