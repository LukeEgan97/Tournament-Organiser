import React from "react";
import firebase from "../firestore";
import moment from "moment";
import {Form, FormGroup, Button, Table,Container, FormControl, Col, Row} from "react-bootstrap";
import ScheduleView from "./ScheduleView";



class ScheduleFunctions extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            matches:[],
        };
        //Have to bind all the function to this so they can be called in jsx
        this.producePools = this.producePools.bind(this);
        this.createMatches = this.createMatches.bind(this);
        this.generateTimelineLabels = this.generateTimelineLabels.bind(this);
        this.assignTime = this.assignTime.bind(this);
        };

componentDidMount() {
    this.producePools();
    this.generateTimelineLabels();
}

    producePools(){
        let counter = 0;
        let sortedTeams = this.props.teams; //props are passed in from parent
        let pools = this.props.tournament.pools;
        let poolInfo = []; //this will contain all the pools
        for(let poolNumber=1; poolNumber<pools+1; poolNumber++){ //first iterate over the number of pools you have
            let poolTeams=[];
            for(let i=counter; i<sortedTeams.length; i=i+pools){ //want every nth team to be put in a pool, as they're seeded, so add the number of pools every time
                poolTeams.push(sortedTeams[i]); //push the first team into that pool
            }
            let pool={poolNumber, poolTeams}; //create a pool with number and the teams
            poolInfo.push({pool});
            counter++; //using counter not i, because for each pool you want to start with the first seed in that pool
            //so pool 1 would have 1st seed, pool 2 starts with 2nd seed etc
        }
        this.setState({poolInfo: poolInfo});
        //the below segment is creating an array containing the headers of a table, so time, and then the various pools
        let headers =["Time"];
        let pitches =[];
        for (let i=0; i<this.props.tournament.numberPitches; i++){
            headers.push("Pitch " + (i+1));
            pitches.push("Pitch " + (i+1));
        }
        this.setState({headers});
        this.setState({pitches});
        this.setState({poolsCreated: true}) //once this is set to pools created, it's okay to safely generate matches
}

renderPool(){
        if(this.state.poolInfo) {
            let rendered=[];
            let pools =this.state.poolInfo.length;
            for ( let i=0; i<pools; i++) { //creating a table for each pool, pushing each table to array and returning that table
                let poolTable =
                    <Col sm={5} key={i}>
                    <Table  striped bordered hover  >
                        <thead>
                        <tr>
                            <th>Pool {i+1}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.poolInfo[i].pool.poolTeams.map((team, index) =>
                            <tr key={index}>
                                <td style={{height:"75px",width:"100px"}}>{team.seeding} {team.name}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                    </Col>;
                rendered.push(poolTable);
            }
    return(
            rendered
    )
        }
}

    createMatches(){
    //basically to create matches, you just have to return an array of every unique combo of teams in the pool
        //so for example 1vs2, 1vs3,1vs4 would be generated on first pass, then 2vs3, 2vs4 in next, finally 3vs 4
        let id=1; //will be used as a docid in fire base, so needs to be unique or will be overwriten
        let matches=[];
        let pools = this.props.tournament.pools;
      let poolInfo=this.state.poolInfo;
        for (let i=0; i<pools; i++) { //for every pool
                let n = poolInfo[i].pool.poolTeams.length; //n is length of current pool
                for (let count = 0; count < n; count++) {
                    for (let j = count + 1; j < n; j++) {//need 3 variable: i is current pool, count is first team, j is next team after that
                        let match = {
                            teamA: poolInfo[i].pool.poolTeams[count].name, //count is basically the index in the array you're on
                            teamB: poolInfo[i].pool.poolTeams[j].name,
                            id: id
                        };
                        matches.push(match);
                        id++;
                        this.props.docRef.doc(this.props.tournament.name).collection("Matches").doc(id.toString()).set(
                            match
                        );
                    }
            }
        }
        this.setState({matches});
        this.setState({matchesGenerated: true}); //it's okay to produce the table because the matches exist
        setTimeout(this.assignTime, 1000) //setState is asynchrous, so might'nt be done immediately, a second is enough to ensure it
    }
    generateTimelineLabels () {
        let availableHours= (this.props.tournament.gameLength* this.props.tournament.numberTimeSlots); //how many games * how long each game is
        let periodsInTournament = moment.duration(availableHours, 'minutes').as("m"); //need to duration for moment to work
        let timeLabels = [];
        let startTimeMoment = moment(this.props.tournament.startTime, 'HH:mm'); // converting start time from string to 24 hour time
        for (let i = 0; i <= periodsInTournament-1; i += this.props.tournament.gameLength) {
            startTimeMoment.add(i === 0 ? 0 : this.props.tournament.gameLength, "m"); //adding however many minutes have passed to original time
            timeLabels.push(startTimeMoment.format('HH:mm ')); //saving the timeslot, so they can all be accessed
        }
        this.setState({timeLabels});

    };
    assignTime() {
            let matches = this.state.matches; //An Array Of Matches like this [{id: 1, teamA: "sockeye", teamB: "Revolver"}, {id: 2, teamA: "example", teamB: "test"}...]
            let table = [];
            let timeslots = this.state.timeLabels; //An Array of timeslots like this ["11:00", "11:30", "12:00".....]
            let pitches = this.state.pitches; //An Array of pitches like this ["pitch 1", "pitch 2"....]

            for (let slot = 0; slot < timeslots.length; slot++) { //this code block runs through every time slot
                let slotMatches = []; //matches that will happen at this time, adding the time first to make it easier to organise later
                let slotTeams = []; //teams that will be playing at this time
                let skippedMatches = [];
                for (let pitchNo = 0; pitchNo < pitches.length; pitchNo++) { //running through the available pitches
                    let match = matches[0];//getting first match from the list
                    if (match) { //checking a match exists
                        while (slotTeams.includes(match.teamA) || slotTeams.includes(match.teamB)) { //if one of the teams is already scheduled for that slot
                            skippedMatches.push(match); //skip this match
                            matches.shift(); //remove that match temporarily from the list
                            match = matches[0]; //get the next match up
                        }
                        slotMatches.push(match); //if it passes the while loop, you can assign it to that time
                        matches.shift(); //remove the match
                        slotTeams.push(match.teamA, match.teamB); //put the teams into the list of teams scheduled for that time
                    }
                }
                matches = skippedMatches.concat(matches); //once you get past the timeslot, add the skipped matches back
                table.push(slotMatches); //putting the matches into that slot

            }
            this.shuffle(table); //randomly shuffling so pool matches aren't all after each other,
            table = table.flat(); //have to flatten because firestore doesn't like nested arrays
            this.setState({table});
            this.props.docRef.doc(this.props.tournament.name).collection("Schedule").doc("Schedule").set(
                {table: table, headers: this.state.headers, timeLabels: this.state.timeLabels, poolInfo: this.state.poolInfo}
            );


    }

    shuffle(array) { //FisherYates Shuffle, basically puts all elements in a pool, then randomly generate a number that corrsponds to an index of one of the numbers
        //keeps running til every number is drawn
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

render(){

        return(
            <div>
                <Row>
                    {this.renderPool()}
                </Row>
                {this.state.poolsCreated === true &&
                <Button onClick={this.createMatches}>Generate Timetable</Button>
                }
                {this.state.table &&
                <ScheduleView name={this.props.tournament.name}/>
                }
            </div>
        );

}

} export default ScheduleFunctions;