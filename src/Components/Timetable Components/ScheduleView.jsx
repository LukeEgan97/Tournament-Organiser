import React from "react";
import firebase from "../firestore";
import {Table} from "react-bootstrap";

const db = firebase.firestore();



class ScheduleView extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            headers: []
        }

    }

    componentDidMount() {
        db.collection("tournaments").doc(this.props.name).collection("Schedule").doc("Schedule").get().then(snapshot=>{
            if (snapshot.exists){
                let schedule = snapshot.data();
                console.log(schedule);
                this.setState({table: schedule.table});
                this.setState({headers: schedule.headers});
                this.setState({timeLabels: schedule.timeLabels});
                }
              else
                  this.setState({Schedule: null})
            }
        )
    }
 tableRenderer() {
        /*To map the table, headers are first mapped as normal to a row
        * Mapping the times is more complicated
        * First one <td> is created from timelabel
        *Then split the table array into portions dependent on how many pitches there (headers-1 because the first heading is time)
        * following this map over the slice you .map as normal, using .slice to create an array from the first index in that row to the last one
        *   */
     const NO_OF_PITCHES = (this.state.headers.length-1);

    let table = <Table striped bordered hover responsive="sm" id='mytable'>
        <thead>
        <tr>
            {this.state.headers.map((header, index) =>
                <th key={index}>{header} </th>
            )}
        </tr>
        </thead>
        <tbody>
        {this.state.timeLabels.map((label, index)=> {
            let from = NO_OF_PITCHES * index;
            let to = NO_OF_PITCHES * (index + 1);

        return    <tr key={index}>
                <td><b>{label}</b></td>
                {this.state.table.slice(from,to).map((match, index)=>
                    <td key={index}>{match.teamA} vs {match.teamB}</td>
                )}
            </tr>
        }
        )
        }
        </tbody>

    </Table>;
return (
    <div>
        {table}
    </div>
    )

}

    render() {
        if (this.state.timeLabels) {
            return (
                <div>
                    {this.tableRenderer()}
                </div>
            )
        }
        else if(!this.state.table){
            return <h1> Schedule Not Yet Available, Check Back Later</h1>
        }
        else return(
            <p>Loading</p>
        )

    }

} export default ScheduleView

