import React from 'react';
import firebase from "./firestore";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


 class TeamInput extends React.Component {
    state = {
        name: '',
        tournament: '',
        tournaments: [],
    };

      db = firebase.firestore();

     componentDidMount() {

    let tournaments = this.db.collection('tournaments').get().then(querySnapshot => {
      tournaments = querySnapshot.docs.map(doc => doc.data());
        this.setState( {tournaments});
        this.tournamentChoices();
    });

     }

     tournamentChoices() {
         var select = document.getElementById("select");
         for (var i = 0; i < this.state.tournaments.length; i++) {
             var option = document.createElement("option");
             option.text = this.state.tournaments[i].name;
             // Best to use ID for value
             option.value = this.state.tournaments[i].id;
             select.appendChild(option)
         }
     }
 handleTournament = event =>{
         this.setState( {tournament: event.target.value});
 };
    handleName = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.db.settings({
            timestampsInSnapshots: true
        });

        const team = {
            name: this.state.name,
            tournament: this.state.tournament,

        };



       this.db.collection('teams').doc(this.state.name).set({
            name: this.state.name,
           tournament: this.state.tournament,
        });

    };

    render() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>

                <Form onSubmit={this.handleSubmit}>

                        <FormGroup>
                    <Label>
                        Team Name:
                        <Input type="text" name="name" onChange={this.handleName} />
                    </Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type="select" id="select" onChange={this.handleTournament}>
                            <option value="default">Select Tournament</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Add</Button>
                </Form>

            </div>
        )
    }
}
export default TeamInput;