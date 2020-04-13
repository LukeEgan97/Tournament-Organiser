import React from "react";
import firebase, {auth} from "../firestore";
import {Form, Button, FormGroup, FormControl,Col, Jumbotron} from "react-bootstrap";
import ScheduleFunctions from "../Timetable Components/ScheduleFunctions";
import Navigation from "./NavBar";


const db = firebase.firestore();
const docRef = db.collection("tournaments");

class ManageTournament extends React.Component{

    constructor(props){
        super(props);

        this.state={
            name: firebase.auth().currentUser.displayName,
            tournaments:[],
            errorText:"",
            teams:[],
            seedingForm: false,
        };

        this.populateTeams = this.populateTeams.bind(this);
        this.handleSeedingSubmit =this.handleSeedingSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }



    componentDidMount() {
        let tournaments = docRef.where("organizer", "==" , this.state.name).get().then(querySnapshot => {
            tournaments = querySnapshot.docs.map(doc => doc.data());
            this.setState( {tournaments});
            console.log(this.state.tournaments)
        }).catch(function(error) {
            this.setState({errorText: "You Do Not Have Any Created Tournaments"});
            console.log(Error);
        });

    }

    populateTeams(){
        this.setState({teams :[]});
        this.setState({renderScheduleFunctions: false});
        for (let i=0; i < this.state.tournaments.length; i++) {
            if (this.state.tournaments[i].name === this.state.tournamentName) {
                this.setState({tournament: this.state.tournaments[i]});
                this.setState({maxTeams: this.state.tournaments[i].noTeams});
                break
            }
        }
      let teams = docRef.doc(this.state.tournamentName).collection("Teams").get()
            .then(querySnapshot => {
                teams = querySnapshot.docs.map(doc => doc.data());
                this.setState({teams});
                if(this.state.teams.length<this.state.maxTeams){
                    this.setState({maxTeams: this.state.teams.length})
                }
                this.setState({seedingForm: true});
                });
 };
  onChangeHandler = event => {
        let {name, value} =event.target;
        value = parseInt(value,10);
      this.setState({
          inputs: {
              ...this.state.inputs,
              [name]: value
          }
      })
    };

    renderSeedingForm() {
        if(this.state.seedingForm==true && this.state.teams.length>0){
            return (
                <Form onSubmit={this.handleSeedingSubmit}>
                    {this.state.teams.map((team)=>
                        <Form.Row key={team.name}>
                            <Col>
                            <Form.Label >{team.name}</Form.Label>
                            </Col>
                            <Col>
                            <Form.Control type = "number" name={team.name} min={1} max={this.state.maxTeams} onChange={this.onChangeHandler} />
                            </Col>
                        </Form.Row>
                    )}
                    <Button type="submit" >
                       Submit
                    </Button>
                </Form>
            )}
        else if(this.state.seedingForm===true && this.state.teams.length==0){
            return(
                <Jumbotron color="primary">
                    <h1 style={{textAlign: 'center'}} >Unfortunately No Teams Have Registered For This Tournament Yet</h1>
                </Jumbotron>
            )
        }

        }

    handleSeedingSubmit = event =>{
        event.preventDefault();
        let  inputs  = this.state.inputs;
     inputs  = this.removeNonSeeded(inputs);
        let valuesInState = Object.values(inputs);
        let uniqueValuesArr = [...new Set(valuesInState)];
        const areInputsValid = valuesInState.length === uniqueValuesArr.length && valuesInState.length===this.state.maxTeams;
        if (!areInputsValid) {
            alert("Each Team Must Be Uniquely Seeded")
        }
        else {
          let sortedTeams=[];
           this.setState({seedingForm: false});
            let teams = Object.entries(this.state.inputs);
            this.setState({teams});
            for (let [name, seeding] of teams) {
               let team={name: name, seeding:seeding};
               sortedTeams.push(team);
                docRef.doc(this.state.tournamentName).collection("Teams").doc(name).set(
                    team
                )
            }
            sortedTeams.sort((a, b) => (a.seeding > b.seeding) ? 1 : -1);
            this.setState({teams: sortedTeams});

        }
        this.setState({renderScheduleFunctions: true})
    };

     removeNonSeeded = (obj) => {
        let newObj = {};
        Object.keys(obj).forEach((prop) => {
            if (obj[prop]) { newObj[prop] = obj[prop]; }
        });
        return newObj;
    };

    render(){

return(
    <div>
    <Navigation/>
    <div className={"centered"}>
    <Form >
        <Col lg={10}>
    <Form.Control   as ="select" id="select"  onChange={(e) => this.setState({tournamentName: e.target.value})}>
        <option>Select A Tournament To Manage</option>
        {this.state.tournaments.map((tournament) => <option key={tournament.name} value={tournament.name}>{tournament.name}</option>)}
    </Form.Control>
    </Col>
        <Col lg={10}>
        <Button style={{marginBottom :"20px"}} onClick={this.populateTeams} disabled={!this.state.tournamentName}>Select Teams For This Tournament</Button>
        </Col>
    </Form>
        {this.renderSeedingForm()}
        <div>
            {this.state.renderScheduleFunctions === true &&
            <ScheduleFunctions tournament={this.state.tournament} teams={this.state.teams} docRef={docRef}/>
            }
        </div>
    </div>
    </div>

)
}
} export default ManageTournament;