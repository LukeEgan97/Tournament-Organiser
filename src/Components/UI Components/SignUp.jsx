import React, { useState } from "react";
import {Form, FormGroup ,Container,Row,Col,Button} from "react-bootstrap";
import  firebase, {auth, generateUserDocument} from "../firestore";
import {Link, navigate} from "@reach/router";


const SignUp = () => {
    const db = firebase.firestore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const tournaments=[];
    const userList = nameCheck();
    const [emailError,setEmailError] = useState("");
    const [nameError,setnameError] = useState("");
    const [passwordError,setPasswordError] = useState("");

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
       if (userList.includes(displayName)===false) {
           setnameError("");
           try {
               const {user} = await auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                   var errorCode = error.code;
                   var errorMessage = error.message;
                   if (errorCode == 'auth/email-already-in-use') {
                       setEmailError('That Email Is In Use')
                   } else if (errorCode == 'auth/invalid-email') {
                       setEmailError('Please Enter A Valid Email')
                   } else if (errorCode == 'auth/weak-password') {
                       setPasswordError('Password Must Be 6 characters or more')
                   } else {
                       console.log(error);
                   }
               });
               await generateUserDocument(user, {displayName, tournaments});
               user.updateProfile({
                   displayName: displayName,
               }).then(function () {
                   db.collection('userNames').doc(displayName).set(
                       {displayName}
                   );
                   navigate("/")
               })
                   .catch(function (error) {
                       // an error occured
                   });
           } catch (error) {
               setError('Error Signing up with email and password');
           }
           setPassword("");
       }
       else{
           setnameError("UserName Is Taken")
       }
       setPassword("");
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
let users =[];
    db.collection("userNames").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
         users.push( doc.data().displayName)
        });
    });
return users;
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
                        <p style={{color:"red"}}> {nameError}</p>
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
                        <p style={{color:"red"}}> {emailError}</p>
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
                        <p style={{color:"red"}}> {passwordError}</p>
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