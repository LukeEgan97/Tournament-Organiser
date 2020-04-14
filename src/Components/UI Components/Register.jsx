import React from 'react';
import firebase from "../firestore";
import {Form,FormControl,Button, FormGroup} from "react-bootstrap";
import Navigation from "./NavBar";


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
            tournament: '',
            tournaments: [],
            registeredTournaments: [],
            unRegisterSelection: "",
            text:"",
            errorText:"",
        };
    }

      db = firebase.firestore();
     componentDidMount() {
    let tournaments = this.db.collection('tournaments').get().then(querySnapshot => {
      tournaments = querySnapshot.docs.map(doc => doc.data());
        this.setState( {tournaments});
    }).catch(function(error) {
        this.setState({errorText: "There Was An Error Retreiving Documents, Please Refresh"})
        console.log(Error);
    });
        let registeredTournaments = this.db.collection("users").doc(this.state.uid).collection("registeredTournaments").get().then(
        querySnapshot => {
            registeredTournaments = querySnapshot.docs.map(doc=> doc.data());
            this.setState({registeredTournaments});
        }
    ).catch(function(error) {
            this.setState({errorText: "There Was An Error Retreiving Documents, Please Refresh"})
            console.log(error);
        });
     }

    handleRegistration = event => {
        event.preventDefault();
        this.db.settings({
            timestampsInSnapshots: true
        });
       this.db.collection('tournaments').doc(this.state.tournament).collection('Teams').doc(this.state.name).set({
            name: this.state.name,
        });
        this.db.collection('users').doc(this.state.uid).collection('registeredTournaments').doc(this.state.tournament).set(
            {name: this.state.tournament}
        );
        alert("Succesfully Registered to Tournament")
        let registeredTournaments = this.db.collection("users").doc(this.state.uid).collection("registeredTournaments").get().then(
            querySnapshot => {
                registeredTournaments = querySnapshot.docs.map(doc=> doc.data());
                this.setState({registeredTournaments});
            }
        )
    }


    handleUnregister= event =>{
        event.preventDefault();
        this.db.collection("tournaments").doc(this.state.unRegisterSelection).collection("Teams").doc(this.state.name).delete();
        this.db.collection("users").doc(this.state.uid).collection("registeredTournaments").doc(this.state.unRegisterSelection).delete().then(success=>{
            alert("Succesfully Removed From Tournament");
            let registeredTournaments = this.db.collection("users").doc(this.state.uid).collection("registeredTournaments").get().then(
                querySnapshot => {
                    registeredTournaments = querySnapshot.docs.map(doc=> doc.data());
                    this.setState({registeredTournaments});
                }

            )
        }).catch(function(error) {
            console.log("Error getting document:", error);
            this.setState({errorText: "There Was An Error Removing You From This Tournament, Please Try Again"  })
        })
        };
    render() {
        return (
            <div>
                <Navigation/>

            <div className={"centered"}>
                <Form onSubmit={this.handleRegistration}>
                    <Form.Group>
                        <Form.Label>Register For A Tournament</Form.Label>
                        <Form.Control as ="select" id="select" value={this.state.tournament} onChange={(e) => this.setState({tournament: e.target.value, text: ""})}>
                            <option>Select A Tournament To Register For</option>
                            {this.state.tournaments.map((tournament) => <option key={tournament.name} value={tournament.name}>{tournament.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">Register</Button>
                </Form>

                <Form onSubmit={this.handleUnregister}>
                        <Form.Group>
                            <Form.Label>UnRegister From A Tournament</Form.Label>
                            <Form.Control as ="select" id="select" value={this.state.unRegisterSelection} onChange={(e) => this.setState({unRegisterSelection: e.target.value, text: ""})}>
                                <option>Select A Tournament To UnRegister From</option>
                                {this.state.registeredTournaments.map((tournament) => <option key={tournament.name} value={tournament.name}>{tournament.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit">Un-Register</Button>
                    </Form>
                <p>{this.state.text}</p>
                <p>{this.state.errorText}</p>
            </div>
            </div>
        )
    }
}
export default Register;