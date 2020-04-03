import React, { useState } from "react";
import {Form, FormGroup ,Container,Row,Col,Button} from "react-bootstrap";
import  firebase, {auth, generateUserDocument} from "../firestore";
import {Link, navigate} from "@reach/router";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);
    const tournaments=[];
    const userList = [];




    const db = firebase.firestore();

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
            try {
                const {user} = await auth.createUserWithEmailAndPassword(email, password);
                await generateUserDocument(user, {displayName, tournaments});
                user.updateProfile({
                    displayName: displayName,
                }).then(function () {
                    console.log(user.displayName);
                })
                    .catch(function (error) {
                        // an error occured
                    });
                console.log(user.displayName);
                await navigate('/');
            } catch (error) {
                setError('Error Signing up with email and password');
            }

            setEmail("");
            setPassword("");
            setDisplayName("");
    };
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "displayName") {
            setDisplayName(value);
        }
        else if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        }
    };

function nameCheck(){

    db.collection("userNames").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
         userList.push( doc.data().displayName)
        });
        console.log(userList);
        if (userList.includes(displayName)===true)
            alert("Name Is Taken");

    });

}


    return (

        <div>
            <Container>
                <Row>
                    <Col/>
                    <Col lg="6">
            <h1>Sign Up</h1>

                <Form>
                    <Form.Group>
                    <Form.Label>
                        Team Name:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Revolver Ultimate"
                        id="teamName"
                        onChange={event => onChangeHandler(event)}
                        required
                    />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label >
                        Email:
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="userEmail"
                        value={email}
                        placeholder="E.g: revolver@frisbee.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                        required
                    />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <FormGroup>
                    <Form.Label>
                        Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                        required
                    />
                    </FormGroup>
                    <Button onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password) }}>

                        Sign up
                    </Button>
                    <Button onClick={nameCheck}>Name Check</Button>
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