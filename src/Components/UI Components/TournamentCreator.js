import React from "react";
import firebase, {auth} from "../firestore";
import {Form, FormGroup, Button, Container, FormControl, Col, Row} from "react-bootstrap";

class TournamentCreator extends React.Component{
    state = {
        name: "",
        bracket: "",
        location: "",
        noTeams: "",
        pools: "",
        powerPools:"",
        startDate: "",
        endDate: "",
        creator: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid,

    };

    db = firebase.firestore();



     onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "tournamentName") {
            this.setState({name: value});
        }
        else if (name === "location") {
            this.setState({location: value});

        } else if (name === "maxTeams") {
            this.setState({noTeams: value});

        }
        else if (name === "noPools") {
            this.setState({pools: value});
        }
    };

    handleSubmit = event=>
    {
            event.preventDefault();
            const tournament = {
                name: this.state.name,
                startDate: document.getElementById("startDate").value,
                endDate: document.getElementById("endDate").value,
                location: this.state.location,
                noTeams: this.state.noTeams,
                bracket: document.getElementById("bracketStyle").value,
                pools: this.state.pools,
                powerPools: document.getElementById("powerPools").value,
                organizer: this.state.creator,

            };
        this.db.collection('tournaments').doc(this.state.name).set(
            tournament
        );

        this.db.collection('users').doc(this.state.uid).collection('createdTournaments').doc(this.state.name).set(
            {name: this.state.name, startDate: this.state.startDate}
        );
    };

    render() {
        return (

    <Form className="centered">


        <Form.Group>
        <Form.Label>Tournament Name</Form.Label>
        <FormControl type ="text" name="tournamentName"  placeholder="Tournament Name" onChange={this.onChangeHandler} required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type ="date" id = "startDate" required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control type ="date" id = "endDate" required/>
        </Form.Group>

        <Form.Group>
        <Form.Label>Tournament Location</Form.Label>
            <FormControl type="text" name = "location"  placeholder = "Location" onChange={this.onChangeHandler} required/>
        </Form.Group>
        <FormGroup>
        <Form.Label>Maximum Teams</Form.Label>
            <FormControl name = "maxTeams"  placeholder = "Maximum Teams" type = "number" min = "4" onChange={this.onChangeHandler}/>
        </FormGroup>
        <Form.Group>
        <Form.Label>No Pools</Form.Label>
            <FormControl  name = "noPools" placeholder="Number Of Pools" type="number" min="1" onChange={this.onChangeHandler}/>
        </Form.Group>
        <Form.Group>
        <Form.Label>Bracket Style</Form.Label>
            <FormControl id = "bracketStyle" as= "select" >
                <option>Pre-Quarters</option>
                <option>Quarters</option>
                <option>Semis</option>
            </FormControl>
        </Form.Group>
        <Form.Group>
        <Form.Label>Power Pools?</Form.Label>
            <FormControl as= "select" id="powerPools" >
                <option>Yes</option>
                <option>No</option>
            </FormControl>
        </Form.Group>
        <Button onClick={this.handleSubmit}>Create Tournament </Button>
    </Form>
        )
}
}
export default TournamentCreator;