import React from "react";
import firebase from "../firestore";
import Navigation from "../UI Components/NavBar";

const db = firebase.firestore();
const dbRef = db.collection("Schedules")

class ScheduleView extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: props.name,
            headers: []
        }
    }

    componentDidMount() {
        dbRef.get().then(snapshot=>{
            if (snapshot.exists){
                let schedule = snapshot.data();
                console.log(schedule);
                this.setState({schedule});
                this.setState({headers: this.state.schedule.headers});
            }
              else
                  this.setState({Schedule: null})
            }

        )

    }

    render() {
        return (
            <div>
            <Navigation/>

            <table id='mytable'>
                <thead>
                <tr>
                    { this.state.headers.map((header,index) =>
                        <th key={index}>{header} </th>
                    )}
                </tr>
                </thead>
            </table>
            </div>
        )

    }

} export default ScheduleView

