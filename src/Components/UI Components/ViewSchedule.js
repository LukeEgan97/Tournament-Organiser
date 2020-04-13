import React from "react";
import ScheduleView from "../Timetable Components/ScheduleView";
import firebase from "../firestore";
import {Button, Form} from "react-bootstrap";


class ViewSchedule extends React.Component{
    db = firebase.firestore();
    uid= firebase.auth().currentUser.uid;

    constructor(props) {
        super(props);
        this.state={
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let registeredTournaments = this.db.collection("users").doc(this.uid).collection("registeredTournaments").get().then(
            querySnapshot => {
                registeredTournaments = querySnapshot.docs.map(doc=> doc.data());
                this.setState({registeredTournaments});
                this.setState({gotTournaments:true})
            }
        ).catch(function(error) {
            this.setState({errorText: "There Was An Error Retreiving Documents, Please Refresh"});
            console.log(error);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ render:true });
    }
    render(){
        return (
            <div>
                {this.state.gotTournaments === true &&
                    <div>
                <Form className="centered" onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select Schedule To View</Form.Label>
                        <Form.Control as="select" id="select" value={this.state.tournament}
                                      onChange={(e) => this.setState({tournament: e.target.value})}>
                            <option value={"default"}>Select A Schedule To View</option>
                            {this.state.registeredTournaments.map((tournament) => <option key={tournament.name}
                                                                                          value={tournament.name}>{tournament.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                        <Button type="submit" disabled={!this.state.tournament ||this.state.tournament == "default"}>View Schedule</Button>
                </Form>
                        {this.state.render === true &&
                        <ScheduleView name={this.state.tournament}/>
                        }
                    </div>
                }
            </div>

        )
    }


} export default ViewSchedule;