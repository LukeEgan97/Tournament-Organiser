
import { Card, Button, CardTitle, CardText, Container, Row, Col  } from 'reactstrap';
import React from "react";
import  {auth} from "../firestore";





export default class LandingScreen extends React.Component {

    render() {

        return (

            <Container>
                <Row>
                    <Col sm="12" lg="6">
            <Card body>
                <img width="100%" height="350vh" src="https://live.staticflickr.com/3165/2673046919_4c02cf7a1a_z.jpg" alt="Card image cap" />
                <CardTitle>Captain</CardTitle>
                <CardText>Go to the Captains page to manage rosters and Enroll in Tournaments</CardText>
                <Button  >Take Me To The Captain's Page</Button>
            </Card>
                    </Col>
                    <Col sm="12" lg="6">
                        <Card body>
                        <img width="100%" height="350vh" src="/TD.jpg" alt="Card image cap" />
                        <CardTitle>Tournament Organisation</CardTitle>
                        <CardText>Manage Your Tournaments, including teams and schedule</CardText>
                            <Button > Take me to The Organizer's Page</Button>
                    </Card>
                    </Col>
                </Row>
                <Button onClick = {() => {auth.signOut()}}>Sign Out </Button>
            </Container>



        )
    }
}