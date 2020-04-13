import React, {useContext} from "react";
import firebase, {auth} from "../firestore";
import {Form, FormGroup, Button, Container, FormControl, Col, Row} from "react-bootstrap";
import Navigation from "./NavBar";
import {UserContext} from "../Providers/UserProvider";

class TournamentCreator extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            location: "",
            noTeams: "",
            pools: "",
            startDate: "",
            startTime: "",
            creator: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
            numberPitches: 0,
            numberTimeSlots: "",
            gameLength: 0,
        };
    }

    db = firebase.firestore();

     onChangeHandler = event => {
       let  name=event.target.name;
        this.setState({[name]: event.target.value});
    };



    handleSubmit = event=>
    {
            event.preventDefault();
            let tournament = {
                name: this.state.name,
                startDate: this.state.startDate,
                startTime: this.state.startTime,
                location: this.state.location,
                noTeams: parseInt(this.state.noTeams,10),
                pools: parseInt(this.state.pools,10),
                organizer: this.state.creator,
                numberPitches:parseInt(this.state.numberPitches, 10),
                gameLength:  parseInt(this.state.gameLength,10),
                numberTimeSlots: parseInt(this.state.numberTimeSlots,10)
            };
        this.db.collection('tournaments').doc(this.state.name).set(
            tournament
        );

        this.db.collection('users').doc(this.state.uid).collection('createdTournaments').doc(this.state.name).set(
            {name: this.state.name, startDate: this.state.startDate}
        );
        alert("Your Tournament Was Created Successfully!")
    };

    render() {
        return (
            <div>
                <Navigation/>
            <Container>
    <Form className="centered" onSubmit={this.handleSubmit}>


        <Form.Group>
        <Form.Label>Tournament Name</Form.Label>
        <FormControl type ="text" name="name"  placeholder="Tournament Name" onChange={this.onChangeHandler} required/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <FormControl type ="date" name = "startDate" onChange={this.onChangeHandler} required/>
        </Form.Group>

        <Form.Group>
            <Form.Label> Start Time</Form.Label>
            <FormControl type="time" name="startTime" required onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Available TimeSlots</Form.Label>
            <FormControl name ="numberTimeSlots" type="number" min="1" step="1" required onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group>
        <Form.Label>Tournament Location</Form.Label>
            <FormControl type="text" name = "location"  placeholder = "Location" onChange={this.onChangeHandler} required/>
        </Form.Group>

        <Form.Group>
        <Form.Label>Maximum Teams</Form.Label>
            <FormControl name = "noTeams"  placeholder = "Maximum Teams" type = "number" min = "4" required onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group>
        <Form.Label>No Pools</Form.Label>
            <FormControl  name = "pools" placeholder="Number Of Pools" type="number" min="1" required onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Game Length</Form.Label>
            <FormControl name = "gameLength" required placeholder="Length Of Games, in increments of 10 minute" type="number" min="10" max="90" step="5" onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Available Pitches</Form.Label>
            <FormControl name ="numberPitches" type = "number" min="1" max="8" required onChange={this.onChangeHandler}/>
        </Form.Group>
        <Button type="submit">Create Tournament </Button>
    </Form>
            </Container>
            </div>

        )
}
}
export default TournamentCreator;