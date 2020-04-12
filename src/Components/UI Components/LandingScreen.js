

import {Card, Button, Container, Row, Col, CardDeck, Nav} from 'react-bootstrap';
import React, {useContext} from "react";
import firebase, {auth} from "../firestore";
import {Router, Link, navigate} from "@reach/router";
import {UserContext} from "../Providers/UserProvider";
import TournamentCreator from "./TournamentCreator";
import Navigation from "./NavBar";


const LandingScreen = () => {
    const user = firebase.auth().currentUser;
    const displayName = user.displayName;
    console.log(user);


        return (
            <div>
            <Navigation/>
            <Container>

                <div>
                    <Router>
                        <TournamentCreator path ="create"/>
                    </Router>
                </div>
                <h1 className="text-center" style={{color:"red"}} > Welcome {displayName} </h1>
                <Row>
                        <CardDeck >
                        <Card>
                            <Card.Img src = "/TD (resized).jpg" width="300" height="300"/>
                            <Card.Body className="text-center">
                            <Card.Title>Manage An Existing Tournament</Card.Title>
                            <Card.Text>View Registered Teams, Add Seeding And Create The Schedule</Card.Text>
                            </Card.Body>
                            <Card.Footer><Button variant = "primary" className="btn-block"><Link to= "manage" style={{color:"black"}}>Manage Tournament</Link></Button></Card.Footer>
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
                                <Card.Text>See A List Of Upcoming Tournaments And Register Or Remove Your Team</Card.Text>
                            </Card.Body>
                            <Card.Footer ><Button variant = "primary" className="btn-block"><Link to= "register" style={{color:"black"}}>Join Tournament</Link></Button></Card.Footer>
                        </Card>

                            <Card >
                                <Card.Img src = "/MKBhD.jpg" width="300" height="300"/>
                                <Card.Body className="text-center">
                                    <Card.Title>View the Schedules Of Tournaments You Have Joined</Card.Title>
                                    <Card.Text>See The Schedule For A Tournament You Registered For</Card.Text>
                                </Card.Body>
                                <Card.Footer ><Button variant = "primary" className="btn-block"><Link to= "/view" style={{color:"black"}}>View Schedule</Link></Button></Card.Footer>
                            </Card>

                    </CardDeck>
                </Row>
            </Container>
            </div>

        )
};

export default LandingScreen;