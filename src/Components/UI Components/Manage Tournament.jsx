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



    componentDidMount() { //getting tournaments where the current user was the organizer
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
        this.setState({renderScheduleFunctions: false}); //In case you switched which tournament you were editing, this will reset it's state
        for (let i=0; i < this.state.tournaments.length; i++) { //iterating through every tournament available, and selecting the one wo's name matches the value from a dropdown
            if (this.state.tournaments[i].name === this.state.tournamentName) {
                this.setState({tournament: this.state.tournaments[i]});
                this.setState({maxTeams: this.state.tournaments[i].noTeams}); //max teams is used in form validation, to make sure you can't seed higher than the max
                break
            }
        }
        //Now that we have the name of the tournament, can pull it from firebase
      let teams = docRef.doc(this.state.tournamentName).collection("Teams").get()
            .then(querySnapshot => {
                teams = querySnapshot.docs.map(doc => doc.data()); //converts multiple docs into an array with fields from doc as values
                this.setState({teams});
                if(this.state.teams.length<this.state.maxTeams){ //if there are less teams registered than capacity, this changes the max for validation
                    this.setState({maxTeams: this.state.teams.length})
                }
                this.setState({seedingForm: true}); //now that teams is set, the seeding form can be rendered
                });
 };
  onChangeHandler = event => {
        let {name, value} =event.target;
        value = parseInt(value,10); //had to convert to in, because value from dropdown is always string
      this.setState({ //takes all the inputs the user has put in
          inputs: {
              ...this.state.inputs,
              [name]: value
          }
      })
    };

    renderSeedingForm() {
        if(this.state.seedingForm==true && this.state.teams.length>0){ //will crash if there's no teams, so need to prevent that
            return (
                <Form onSubmit={this.handleSeedingSubmit}>
                    {this.state.teams.map((team)=> //Mapping list of teams to labels and inputs, can reference the input by team name
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
        else if(this.state.seedingForm===true && this.state.teams.length<this.state.tournament.pools){//Pulled the tournament from firestore, but not even teams to make matches
            return(
                <Jumbotron color="primary">
                    <h1 style={{textAlign: 'center'}} >Unfortunately Not Enough Teams Have Registered For This Tournament Yet</h1>
                </Jumbotron>
            )
        }
        }

    handleSeedingSubmit = event =>{
        event.preventDefault();
        let  inputs  = this.state.inputs;
     inputs  = this.removeNonSeeded(inputs); //taking away any teams who have no seeded value
        let valuesInState = Object.values(inputs);
        let uniqueValuesArr = [...new Set(valuesInState)]; //pulling unique values of inputs
        //inputs are only valid if the amount of unique inputs matches the required teams for the tournaments
        const areInputsValid = valuesInState.length === uniqueValuesArr.length && valuesInState.length===this.state.maxTeams;
        if (!areInputsValid) {
            alert("Each Team Must Be Uniquely Seeded")
        }
        else {
          let sortedTeams=[];
           this.setState({seedingForm: false}); //don't need this form anymore
            let teams = Object.entries(this.state.inputs);
            this.setState({teams});
            for (let [name, seeding] of teams) { //for every item in teams, create a team with name and seeding
               let team={name: name, seeding:seeding};
               sortedTeams.push(team);
                docRef.doc(this.state.tournamentName).collection("Teams").doc(name).set(
                    team
                )
            }
            sortedTeams.sort((a, b) => (a.seeding > b.seeding) ? 1 : -1); //sorting teams by seeding
            this.setState({teams: sortedTeams});
        }
        this.setState({renderScheduleFunctions: true}) //Everything is ready to begin creating the schedule
    };

     removeNonSeeded = (obj) => {
        let newObj = {};
        Object.keys(obj).forEach((prop) => { //for every item passed in,if the key(seed) exists, add it to a new object, return the new object
            if (obj[prop]) { newObj[prop] = obj[prop]; } //checkinf if there's any value stored, if there isn't it's skipped
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