import React, { useState } from "react";
import ReactDOM from "react-dom";
import SignIn from "./SignIn";
import Button from "reactstrap/lib/Button";
import {Form, FormGroup, Label, Input,Container,Row,Col} from "reactstrap";
import firebase, {auth, generateUserDocument} from "../firestore";
import { Link } from "@reach/router";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teamName, setTeamName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {teamName});
        }
        catch(error){
            setError('Error Signing up with email and password');
        }

        setEmail("");
        setPassword("");
        setTeamName("");
    };
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "teamName") {
            setTeamName(value);
        }
        else if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        }
    };




    return (
        <div>
            <Container>
                <Row>
                    <Col/>
                    <Col lg="6">
            <h1>Sign Up</h1>

                <Form>
                    <FormGroup>
                    <Label>
                        Team Name:
                    </Label>
                    <Input
                        type="text"
                        name="teamName"
                        value={teamName}
                        placeholder="Revolver Ultimate"
                        id="teamName"
                        onChange={event => onChangeHandler(event)}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label >
                        Email:
                    </Label>
                    <Input
                        type="email"
                        name="userEmail"
                        value={email}
                        placeholder="E.g: revolver@frisbee.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label>
                        Password:
                    </Label>
                    <Input
                        type="password"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                    />
                    </FormGroup>
                    <Button onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password); }}>
                        Sign up
                    </Button>
                </Form>
                <p> Already have an account? </p>
                        <Link to="/" >
                            Sign in here
                        </Link>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </div>
    );
};
export default SignUp;