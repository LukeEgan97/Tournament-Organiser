import React from 'react';
import Match from "./Match";
import TournamentCreator from "../UI Components/TournamentCreator";


class Timetable extends React.Component{
matches: Match[];
//timeslots: string[];

constructor(props: any){
 super(props);
 this.matches= props.matches;

}
}
 export default Timetable;