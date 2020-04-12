import React from "react";
import firebase from "../firestore";
import moment from "moment";

const db = firebase.firestore();
const name = "Siege";
const docRef = db.collection("tournaments").doc(name);



class ScheduleCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              matches: [],
            teams: [],
              headers:[],
              timeLabels:[],
            numberTimeslots:0,
            pitches:[],
            pools: 0,
              poolInfo:[],
            gameLength:0,
            availableHours:0,
              startTime: "",
             table:[]
        };
        this.getTeamsAndSort =this.getTeamsAndSort.bind(this);
        this.producePools = this.producePools.bind(this);
        this.createMatches = this.createMatches.bind(this);
        this.generateTimelineLabels = this.generateTimelineLabels.bind(this);
        this.assignTime=this.assignTime.bind(this);
    }

    assignTime(){
        let matches=this.state.matches; //An Array Of Matches like this [{id: 1, teamA: "sockeye", teamB: "Revolver"}, {id: 2, teamA: "example", teamB: "test"}...]
        let table=[];
        let timeslots = this.state.timeLabels; //An Array of timeslots like this ["11:00", "11:30", "12:00".....]
        let pitches = this.state.pitches; //An Array of pitches like this ["pitch 1", "pitch 2"....]

        for (let slot =0; slot<timeslots.length; slot++){ //this code block runs through every time slot
            let slotMatches=[]; //matches that will happen at this time
            let slotTeams= []; //teams that will be playing at this time
            let skippedMatches =[];
            for (let pitchNo = 0; pitchNo<pitches.length; pitchNo++) { //running through the available pitches
                let match = matches[0];//getting first match from the list
                if (match) { //checking a map exists
                    while (slotTeams.includes(match.teamA) || slotTeams.includes(match.teamB)) { //if one of the teams is already scheduled for that slot
                        skippedMatches.push(match); //skip this match
                        matches.shift(); //remove that match temporarily from the list
                        match = matches[0]; //get the next match up
                    }
                    slotMatches.push(match); //if it passes the while loop, you can assign it to that time
                    matches.shift(); //remove the match
                    slotTeams.push(match.teamA, match.teamB); //put the teams into the list of teams scheduled for that time
                }
                matches = skippedMatches.concat(matches); //once you get past the timeslot, add the skipped matches back
            }
            let currentSlot = timeslots[slot];
            console.log(slotMatches);
            table.push(slotMatches); //putting the matches into that slot
            db.collection("Schedules").doc(name).update(
                {[currentSlot]: slotMatches}
            )

        }
        db.collection("Schedules").doc(name).update(
            {headers : this.state.headers}
        )
        this.setState({table});
    }

    shuffle(array) { //FisherYates Shuffle
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getTeamsAndSort(teams) {
        docRef.collection('Teams').get()
            .then(querySnapshot => {
                querySnapshot.forEach(function(doc) {
                    let name = doc.data().name;
                    let seeding = doc.data().seeding;
                    let team = {name, seeding};
                    teams.push(team);
                });
                teams.sort((a, b) => (a.seeding > b.seeding) ? 1 : -1);
                // only set the state after the teams are available
                this.setState({teams});
                this.producePools();
            });
    };


    producePools(){
        let counter = 0;
        let sortedTeams = this.state.teams;
        let pools = this.state.pools;
        let poolInfo = [];
        for(let poolNumber=1; poolNumber<pools+1; poolNumber++){
            let poolTeams=[];
            for(let i=counter; i<sortedTeams.length; i=i+pools){
                poolTeams.push(sortedTeams[i]);
            }
            poolInfo.push({poolNumber,poolTeams});
            counter++;
        }
      this.setState({poolInfo});
        console.log(this.state);
    }

     createMatches(){
        let id=1;
        let matches=[];
        let poolInfo=this.state.poolInfo;
       let pools = this.state.pools;
        for (let i=0; i<pools; i++) {
            let n = poolInfo[i].poolTeams.length;
            for (let count = 0; count < n; count++) {
                for (let j = count + 1; j < n; j++) {
                    let match = {
                        teamA: poolInfo[i].poolTeams[count].name,
                        teamB: poolInfo[i].poolTeams[j].name,
                        id: id
                    };
                    matches.push(match);
                    id++;
                    docRef.collection("Matches").doc(id.toString()).set(
                        match
                    );
                }
        }
        }
        this.setState({matches});
    }

     generateTimelineLabels () {
        let periodsInTournament = moment.duration(this.state.availableHours, 'minutes').as("m");
        let timeLabels = [];
        let startTimeMoment = moment(this.state.startTime, 'HH:mm');
        for (let i = 0; i <= periodsInTournament-1; i += this.state.gameLength) {
            startTimeMoment.add(i === 0 ? 0 : this.state.gameLength, "m");
            timeLabels.push(startTimeMoment.format('HH:mm '));
        }
       this.setState({timeLabels});
        console.log(timeLabels)
    };

    componentDidMount() {
        let headers =["Time"];
        let pitches =[];
        docRef.get().then(snapshot=> {
            let noPitches=snapshot.data().numberPitches;
           let numberTimeslots = snapshot.data().numberTimeslots;
          let  pools = snapshot.data().pools;
            this.setState({numberTimeslots});
            for (let i=0; i<noPitches; i++){
                headers.push("Pitch " + (i+1));
                pitches.push("Pitch " + (i+1));
            }
            this.setState({headers});
            this.setState({pitches});
            this.setState({pools});
           let gameLength= snapshot.data().gameLength;
            let availableHours= (numberTimeslots*gameLength);
           let startTime=snapshot.data().startTime;
            this.setState({gameLength});
            this.setState({availableHours});
            this.setState({startTime});
            this.generateTimelineLabels();
            this.getTeamsAndSort();
        });

    }

    render() {
        return (
            <div>
                <button onClick={this.getTeamsAndSort}> test get teams And sort</button>
                <button onClick={this.producePools}> test produce pools</button>
                <button onClick={this.createMatches}> Test Match Creation</button>
                <button onClick={this.generateTimelineLabels}> Test Label Creation</button>
                <button onClick={this.assignTime}> Test Assigning Time </button>
            </div>
        )
    }
}
export default ScheduleCreator;
