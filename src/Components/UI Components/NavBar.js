import React from 'react';

import {Container,Row,Col,Button,Navbar, Nav} from "react-bootstrap";
import {Link, navigate} from "@reach/router";
import {auth} from "../firestore";

//Navbar is rendered above every component, will condense on different screen sizes
class Navigation extends React.Component {
        render() {
                return (
<div >
    <Navbar bg="light" expand="lg">
        <Navbar.Brand >UltiOrganizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={"mr-auto"}>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/register">Register for Tournaments</Nav.Link>
        <Nav.Link href="/create">    Create a Tournament</Nav.Link>
        <Nav.Link href="/manage">Manage A Tournament</Nav.Link>
        <Nav.Link href="/view">View Schedules</Nav.Link>
        </Nav>
        <Button onClick = {() => {auth.signOut().then(function() {
            navigate("/")
        });}}> Sign Out </Button>

        </Navbar.Collapse>
    </Navbar>

</div>
                )
        }
}

export default Navigation;