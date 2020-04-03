import React from 'react';
import TeamInput from "../UI Components/Register";
import TournamentCreator from "../UI Components/TournamentCreator";


class Pool extends React.Component{
totalTeams : number;
teamList : {name: string, seeding: number};

constructor(props: TournamentCreator){
    super(props);
    this.totalTeams = (props.props.tournament.noTeams)/(props.props.tournamnet.totalTeams);
    this.teamList = props.props.teamList;
}

}
export default Pool;