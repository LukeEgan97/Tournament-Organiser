import React from "react";
// @ts-ignore
import {Button, Form, FormGroup, Label, Input, Container, Col} from "reactstrap";
import firebase from "../firestore";


class TournamentCreator extends React.Component{
    state = {
        name: "",
        bracket: "",
        noTeams: "",
        pools: "",
        powerPools:"",
    };
    db = firebase.firestore();
    handleName = event =>{
        this.setState({name: event.target.value});
    };


    handlePools = event=>{
        this.setState({pools: event.target.value});
    };

    handleNoTeams = event =>{
        this.setState({noTeams: event.target.value});
    };



    handleSubmit = event=>
    {
            event.preventDefault();

            const tournament = {
                name: this.state.name,
                noTeams: this.state.noTeams,
                bracket: document.getElementById("bracketStyle").value,
                pools: this.state.pools,
                powerPools: document.getElementById("powerPools").value,

            };
        this.db.collection('tournaments').doc(this.state.name).set(
            tournament
        );
    };

    render() {
        return (
     <Container class = "centered">
         <Col sm="12" xl="10">
    <Form >
        <FormGroup>
        <Label for ="tournamentName">Tournament Name</Label>
        <Input  name="name" id="tournamentName" placeholder="Tournament Name" onChange={this.handleName} required/>
        </FormGroup>
        <FormGroup>
        <Label>Tournament Location</Label>
            <Input name = "location" id="location" placeholder = "Location"/>
        </FormGroup>
        <FormGroup>
        <Label>Maximum Teams</Label>
            <Input name = "maxTeams" id="maxTeams" placeholder = "Maximum Teams" type = "number" onChange={this.handleNoTeams}/>
        </FormGroup>
        <FormGroup>
        <Label>No Pools</Label>
            <Input id = "noPools" placeholder="Number Of Pools" type="number" min={"1"} onChange={this.handlePools}/>
        </FormGroup>
        <FormGroup>
        <Label>Bracket Style</Label>
            <Input id = "bracketStyle" type = "select" >
                <option>Pre-Quarters</option>
                <option>Quarters</option>
                <option>Semis</option>
            </Input>
        </FormGroup>
        <FormGroup>
        <Label>Power Pools?</Label>
            <Input type = "select" id="powerPools" >
                <option>Yes</option>
                <option>No</option>
            </Input>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Create Tournament </Button>
    </Form>
         </Col>
     </Container>

        )
}
}
export default TournamentCreator;