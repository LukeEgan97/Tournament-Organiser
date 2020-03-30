import React  from 'react';


class Match extends React.Component<any, any>{
     team1 :string;
     team2: string;
     timeslot: string;
constructor(props: any) {
    super(props);
    this.team1=props.team1;
    this.team2=props.team2;
    this.timeslot=props.team2;
}

}

export default Match;