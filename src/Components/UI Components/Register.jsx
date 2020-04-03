import React from 'react';
import firebase from "../firestore";
import {Form,FormControl,Button, FormGroup} from "react-bootstrap";


class Register extends React.Component {
    state = {
        name: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid,
        tournament: '',
        tournaments: [],
        registeredTournaments:[]
    };

      db = firebase.firestore();
       registeredTournaments = [];
     componentDidMount() {
         let registeredTournaments =[];

    let tournaments = this.db.collection('tournaments').get().then(querySnapshot => {
      tournaments = querySnapshot.docs.map(doc => doc.data());
        this.setState( {tournaments});
        this.registrationChoices()
    });
          this.db.collection("users").doc(this.state.uid).collection("tournaments").get()
             .then(function(querySnapshot) {
                 querySnapshot.forEach(function(doc) {
                     console.log(doc.id, " => ", doc.data());
                     let name = doc.data().name;
                     registeredTournaments.push(name);
                     console.log(registeredTournaments);
                     let select = document.getElementById("unregister")
                     for (var i=0; i< registeredTournaments.length; i++) {
                         console.log(registeredTournaments[i]);
                         var option = document.createElement("option");
                         option.text = registeredTournaments[i];
                         option.value = registeredTournaments[i];
                         select.appendChild(option);
                     }
                 });
             })
     }


     registrationChoices() {
         var select = document.getElementById("select");
         for (var i = 0; i < this.state.tournaments.length; i++) {
             var option = document.createElement("option");
             var name = this.state.tournaments[i].name;
             var startDate = this.state.tournaments[i].startDate;
             var endDate = this.state.tournaments[i].endDate;
             var location = this.state.tournaments[i].location;
             var division = this.state.tournaments[i].division;
             var text = (name + "  " + startDate + " to "  + endDate + "  "  + location );
             option.text = text;
             option.value = this.state.tournaments[i].id;
             select.appendChild(option)

         }

     }
 handleTournament = event =>{
         this.setState( {tournament: event.target.value});
 };


    handleRegistration = event => {
        event.preventDefault();
        this.db.settings({
            timestampsInSnapshots: true
        });
       this.db.collection('tournaments').doc(this.state.tournament).collection('teams').doc(this.state.name).set({
            name: this.state.name,
        });
        this.db.collection('users').doc(this.state.uid).collection('registeredTournaments').doc(this.state.name).set(
           this.state.tournament
        );

    };

    render() {
        return (
            <div className={"centered"}>

                <Form onSubmit={this.handleRegistration()}>
                    <Form.Group>
                        <Form.Label>Register For A Tournament</Form.Label>
                        <Form.Control as ="select" id="select" onChange={this.handleTournament}>
                            <option value="default">Select Tournament</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">Register</Button>
                </Form>
                <Form>
                    <Form.Group>
                        <Form.Label>Unregister From A Tournament</Form.Label>
                        <Form.Control as ="select" id="unregister" >
                            <option value="default">Select Tournament</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
export default Register;