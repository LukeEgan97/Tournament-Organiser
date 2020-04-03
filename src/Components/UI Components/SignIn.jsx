import React, {useState} from 'react';
import {Form, FormGroup, Button, Container, Row, Col} from "react-bootstrap";



import  {auth} from "../firestore";
import {Link, navigate} from "@reach/router";


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);



    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            // Logged in successfully
            navigate('/');
        }).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });

    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };


    return (
        <div>
            <Container>
                <Row>
                    <Col> </Col>
                    <Col lg={6}>
            <h1> Sign In </h1>
       <Form>
           <FormGroup>
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
               />
           </FormGroup>

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
               />
           </FormGroup>
           <Button  color= "success" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
               Sign In
           </Button>
       <p>Don't Have An Account?</p>
           <Link to="signUp">
               Sign up here
           </Link>


       </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>

    );
};

export default SignIn;