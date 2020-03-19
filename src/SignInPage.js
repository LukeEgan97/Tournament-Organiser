import React from 'react';
import {Form, Container,FormGroup, Label, Input,Col,Button} from "reactstrap";
import Row from "reactstrap/lib/Row";
import NavBar from "./Components/NavBar";



class SignInPage extends React.Component{
render (){
    return(

        <Container>
            <div className="container-fluid px-0">
            <Row>
                <Col/>
                <Col lg={6}>
                <img src = "/Sky.jpg" width="100%" alt="Guy Being Skyed" />
                </Col>
            <Col/>
            </Row>
            </div>
                <br/>
            <Form class="justify-content-center">
                <FormGroup row>
                    <Col lg={3}/>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10} lg={4}>
                        <Input type="email" name="email" id="email" placeholder="example@example.com" />
                    </Col>
                </FormGroup>

            <FormGroup row>
                <Col lg={3}/>
                <Label for="password" sm={2}>Password</Label>
                <Col sm={10} lg={4}>
                    <Input type="password" name="password" id="password" placeholder="Enter Password" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col lg={3}/>
                <Label for = "name" sm={2}>Team Name </Label>
                <Col sm={10} lg={4}>
                    <Input type="text" id="name" placeholder = "Enter Team Name"/>
                </Col>
            </FormGroup>
<FormGroup row>
    <Col lg={3}/>
    <Label for="divison" sm={2}>Divisions</Label>

                <FormGroup check inline>
                    <Label check>
                        <Input type="checkbox" /> Open
                    </Label>
                </FormGroup>
                <FormGroup check inline>
                    <Label check>
                        <Input type="checkbox" /> Women
                    </Label>
                </FormGroup>

                <FormGroup check inline>
                    <Label check>
                        <Input type="checkbox" /> Mixed
                    </Label>
                </FormGroup>
            </FormGroup>
                <FormGroup>
                    <Button>Register!</Button>
                </FormGroup>

            </Form>
            <NavBar/>
        </Container>








    )
}
}
export default  SignInPage;