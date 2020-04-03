

import {Card, Button, Container, Row, Col, CardDeck, Nav} from 'react-bootstrap';
import React, {useContext} from "react";
import firebase, {auth} from "../firestore";
import {Router, Link, navigate} from "@reach/router";
import {UserContext} from "../Providers/UserProvider";
import TournamentCreator from "./TournamentCreator";
import TeamInput from "./TeamInput";

const LandingScreen = () => {
    const user = firebase.auth().currentUser;
    const displayName = user.displayName;
    console.log(user);


        return (
            <Container>
                <div>
                    <Router>
                        <TournamentCreator path ="create"/>
                    </Router>
                </div>
                <h1>{displayName}</h1>
                <h1 className="text-center" style={{color:"red"}} >Tournaments </h1>

                <Row>

                        <CardDeck >
                        <Card>
                            <Card.Img src = "/TD (resized).jpg" width="300" height="300"/>
                            <Card.Body className="text-center">
                            <Card.Title>Manage An Existing Tournament</Card.Title>
                            <Card.Text>View Registered Teams, Add Seeding And Create The Schedule</Card.Text>
                            </Card.Body>
                            <Card.Footer><Button variant = "primary" className="btn-block"><Link to= "create" style={{color:"black"}}>Manage Tournament</Link></Button></Card.Footer>
                        </Card>


                        <Card >
                            <Card.Img src = "/Sky.jpg" width="300" height="300"/>
                            <Card.Body className="text-center">
                                <Card.Title>Create A New Tournament</Card.Title>
                                <Card.Text>Create A Tournament To Allow Teams To Register</Card.Text>

                            </Card.Body>
                            <Card.Footer ><Button variant = "primary" className="btn-block"><Link to= "create" style={{color:"black"}}>Create Tournament</Link></Button></Card.Footer>
                        </Card>

                            <Card >
                            <Card.Img src = "/Tournament Manager Image.jpg" width="300" height="300"/>
                            <Card.Body className="text-center">
                                <Card.Title>Register Your Team For A Tournament</Card.Title>
                                <Card.Text>See A List Of Upcoming Tournaments And Register Your Team</Card.Text>
                            </Card.Body>
                            <Card.Footer ><Button variant = "primary" className="btn-block"><Link to= "create" style={{color:"black"}}>Join Tournament</Link></Button></Card.Footer>
                        </Card>

                            <Card >
                                <Card.Img src = "/MKBhD.jpg" width="300" height="300"/>
                                <Card.Body className="text-center">
                                    <Card.Title>Register Your Team For A Tournament</Card.Title>
                                    <Card.Text>See A List Of Upcoming Tournaments And Register Your Team</Card.Text>
                                </Card.Body>
                                <Card.Footer ><Button variant = "primary" className="btn-block"><Link to= "create" style={{color:"black"}}>Join Tournament</Link></Button></Card.Footer>
                            </Card>

                    </CardDeck>


                </Row>
                <Button onClick = {() => {auth.signOut()}}> Sign Out </Button>
                <Link to ="create">Test</Link>

            </Container>

        )
};

export default LandingScreen;