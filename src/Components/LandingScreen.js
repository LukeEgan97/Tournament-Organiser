import React from 'react';
import { Card, Button, CardTitle, CardText, Container, Row, Col  } from 'reactstrap';
import ReactDOM from 'react-dom';
import TeamInput from "./TeamInput";
import TournamentCreator from "./TournamentCreator";





export default class LandingScreen extends React.Component {

switchToCaptain = () =>{
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<TeamInput/>, document.getElementById('root'));

    };

switchToAdmin=()=>{
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<TournamentCreator/>, document.getElementById('root'));
};





    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" lg="6">
            <Card body>
                <img width="100%" height="350vh" src="https://live.staticflickr.com/3165/2673046919_4c02cf7a1a_z.jpg" alt="Card image cap" />
                <CardTitle>Captain</CardTitle>
                <CardText>Go to the Captains page to manage rosters and Enroll in Tournaments</CardText>
                <Button  onClick={this.switchToCaptain}>Take Me To The Captain's Page</Button>
            </Card>
                    </Col>
                    <Col sm="12" lg="6">
                        <Card body>
                        <img width="100%" height="350vh" src="/TD.jpg" alt="Card image cap" />
                        <CardTitle>Tournament Organisation</CardTitle>
                        <CardText>Manage Your Tournaments, including teams and schedule</CardText>
                            <Button onClick={this.switchToAdmin}> Take me to The Organizer's Page</Button>
                    </Card>
                    </Col>
                </Row>
            </Container>


        )
    }
}